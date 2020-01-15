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
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from collections import defaultdict
import inputProcessing
import pickle
import dill
from sklearn.externals import joblib

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



def dumpModel(data_model,fileName):
    joblib.dump(data_model,fileName)

def loadModel(fileName):
    return joblib.load(fileName)

def dumpsModelTdif(data_model,fileName):
    fl = open(fileName,'wb')
    enc = dill.dumps(data_model)
    fl.write(enc)

def loadsModelTdif(fileName):
    fl = open(fileName,'rb')
    obj = dill.loads(fl.read())
    return obj

categories = ['culture', 'finance', 'politics', 'science', 'sports', 'tech']

def predictCategory(text,modelPth):
    w2v_model = loadModel(modelPth)
    test_data = inputProcessing.parseData(text)
    sol = w2v_model.predict(test_data)
    return categories[int(sol[0])-1]

def predictCategoryTfidf(text,modelPth):
    tfidf_model = loadsModelTdif(modelPth)
    test_data = inputProcessing.parseData(text)
    sol = tfidf_model.predict(test_data)
    return categories[int(sol[0])-1]
    

def predictionTdif(samples,labels,modelPth):
    w2v_model = loadsModelTdif(modelPth)
    test_data = inputProcessing.getData(samples)
    test_labels = inputProcessing.getLabels(labels)
    lst = w2v_model.predict(test_data)
    cnt = 0
    for i in range(0,len(lst)):
        if lst[i] == test_labels[i]:
            cnt += 1
    print(len(lst))
    print(cnt)

def prediction(samples,labels,modelPth):
    w2v_model = loadModel(modelPth)
    test_data = inputProcessing.getData(samples)
    test_labels = inputProcessing.getLabels(labels)
    lst = w2v_model.predict(test_data)
    cnt = 0
    for i in range(0,len(lst)):
        if lst[i] == test_labels[i]:
            cnt += 1
    print(cnt)

def createVec():
    data = inputProcessing.getData('samples.txt')
    model = gensim.models.Word2Vec(data,size=100)
    w2v = dict(zip(model.wv.index2word,model.wv.syn0))
    # etree_w2v_weight = Pipeline([
    #     ('word2vec vectorizer',MeanEmbedding(w2v)),
    #     ('extra trees',ExtraTreesClassifier(n_estimators=200))
    # ])
    # etree_w2v_weight = Pipeline([
    #     ('word2vec vectorizer',TfidfEmbedding(w2v)),
    #     ('extra trees',ExtraTreesClassifier(n_estimators=200))
    # ])
    # etree_w2v_weight = Pipeline([
    #     ('word2vec vectorizer',TfidfEmbedding(w2v)),
    #     ('ada boost',AdaBoostClassifier(n_estimators=200))
    # ])
    # etree_w2v_weight = Pipeline([
    #     ('word2vec vectorizer',TfidfEmbedding(w2v)),
    #     ('gradient boosting class',GradientBoostingClassifier(n_estimators=200))
    # ])
    # etree_w2v_weight = Pipeline([
    #     ('word2vec vectorier',TfidfEmbedding(w2v)),
    #     ('support vector machine',SVC(kernel='linear'))
    # ])
    etree_w2v_weight = Pipeline([
        ('word2vec vectorizer',TfidfEmbedding(w2v)),
        ('Logistic Regression',LogisticRegression(random_state=0))
    ])


    labels = inputProcessing.getLabels('category_labels.txt')
    print('starting to fit!')
    etree_w2v_weight.fit(data,labels)
    dumpsModelTdif(etree_w2v_weight,'LogRegrTdif.sav')
    # dumpModel(etree_w2v_weight,'ExtraTreeClass.sav')
    # test_data = inputProcessing.getData('validation/samples.txt')
    # test_labels = inputProcessing.getLabels('validation/category_labels.txt')
    # print(len(test_data))
    # print(len(test_labels))
    # lst = etree_w2v_weight.predict(test_data)
    # cnt = 0
    # for i in range(0,len(lst)):
    #     if lst[i] == test_labels[i]:
    #         cnt += 1
    # print(cnt)


# createVec()
prediction('validation/samples.txt','validation/category_labels.txt','AdaBoost.sav')


predictionTdif('validation/samples.txt','validation/category_labels.txt','LogRegrTdif.sav')
# txt = 'cum am spus, nu este un sfârşit de drum . Vom continua lupta cu toate instrumentele şi cu toate mijloacele legale, parlamentare şi civice pe care le avem la dispoziţie . Evident că vom contesta la $NE$ această lege, au anunţat şi colegii de la $NE$ o astfel de contestaţie . Practic trebuie utilizat orice instrument pe care îl identificăm pentru a bloca intrarea în vigoare a acestei legi . Bineînţeles, şi preşedintele are punctul său de vedere . ( . . . ) $NE$ legi sunt împănate de motive de neconstituţionalitate . Colegii mei de la departamentul juridic lucrează în prezent pentru a definitiva textul contestaţiei”, a declarat $NE$ $NE$ citat de news . ro . Senatul a adoptat, marţi, în calitate de for decizional, $NE$ privind statutul judecătorilor şi procurorilor, cu 80 de voturi ”pentru” şi niciun vot ”împotrivă”, în condiţiile în care niciun partid din opoziţie nu a fost prezent în sală .'
# print(predictCategoryTfidf(txt,'GradientBoostingTdif.sav'))
# print(predictCategory(txt,'SVM.sav'))
# fl = open('samples.txt','r',encoding='UTF-8')
# print(fl.readline())