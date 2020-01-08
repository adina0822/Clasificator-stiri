from nltk.tokenize import sent_tokenize, word_tokenize
import warnings

warnings.filterwarnings(action = 'ignore')

import gensim
from gensim.models import Word2Vec
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import AdaBoostClassifier
from collections import defaultdict
import inputProcessing

class MeanEmbedding(object):
    def __init__(self,word2vec):
        self.word2vec = word2vec
        self.dim = len(word2vec.keys())

    def fit(self,x,y):
        return self

    def transform(self,x):
        return np.array([
            np.mean([self.word2vec[w] for w in words if w in self.word2vec] or [np.zeros(self.dim)],axis=0)
            for words in x
        ])

class TfidfEmbedding(object):
    def __init__(self,word2vec):
        self.word2vec = word2vec
        self.word2weight = None
        self.dim = len(word2vec.keys())

    def fit(self,x,y):
        tfidf = TfidfVectorizer(analyzer=lambda x: x)
        tfidf.fit(x)
        max_idf = max(tfidf.idf_)
        self.word2weight = defaultdict(
            lambda: max_idf,
            [(w, tfidf.idf_[i]) for w, i in tfidf.vocabulary_.items()])
        return self
    
    def transform(self,x):
        return np.array([
            np.mean([self.word2vec[w] * self.word2weight[w]
                for w in words if w in self.word2vec] or
                [np.zeros(self.dim)],axis=0)
            for words in x
        ])


def createVec():
    data = inputProcessing.getData('samples.txt')
    model = gensim.models.Word2Vec(data,size=100)
    w2v = dict(zip(model.wv.index2word,model.wv.syn0))
    # etree_w2v = Pipeline([
    #     ('word2vec vectorizer',MeanEmbedding(w2v)),
    #     ('extra trees',ExtraTreesClassifier(n_estimators=200))
    # ])
    # etree_w2v_weight = Pipeline([
    #     ('word2vec vectorizer',TfidfEmbedding(w2v)),
    #     ('extra trees',ExtraTreesClassifier(n_estimators=200))
    # ])
    etree_w2v_weight = Pipeline([
        ('word2vec vectorizer',TfidfEmbedding(w2v)),
        ('ada boost',AdaBoostClassifier(n_estimators=200))
    ])
    labels = inputProcessing.getLabels('category_labels.txt')
    print('starting to fit!')
    etree_w2v_weight.fit(data,labels)
    test_data = inputProcessing.getData('validation/samples.txt')
    test_labels = inputProcessing.getLabels('validation/category_labels.txt')
    print(len(test_data))
    print(len(test_labels))
    lst = etree_w2v_weight.predict(test_data)
    cnt = 0
    for i in range(0,len(lst)):
        if lst[i] == test_labels[i]:
            cnt += 1
    print(cnt)


createVec()



# fl = open('samples.txt','r',encoding='UTF-8')
# print(fl.readline())