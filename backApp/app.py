from flask import Flask,render_template
from flask import jsonify
from flask import request
import pymongo
import numpy as np
import w2VecModel

def getAllFromDb():
    client = pymongo.MongoClient("mongodb+srv://user:cJGKmC03VGoCe3dz@cluster0-gj4ol.mongodb.net/test?retryWrites=true&w=majority")
    db = client.articles
    col=db["articles"]
    article_list=[]
    for x in col.find():
        article_list.append(x)
    return article_list

def addArticleToDb(article_n):
    client = pymongo.MongoClient("mongodb+srv://user:cJGKmC03VGoCe3dz@cluster0-gj4ol.mongodb.net/test?retryWrites=true&w=majority")
    db = client.articles
    col=db["articles"]
    col.insert_one(article_n)

# classify article and get it's predicted label model(extratree;extratreeidf;gradientboosting;gradientboosti;logreg;svm) word2vec,tfidf,
def getArticleClassification(text,model,rep):
    # word2vec
    if(model=="adaboost"):
        model_location="./AdaBoost"

    elif(model=="extratree"):
        model_location="./ExtraTreeClass"

    if(model=="gradientboosting"):
        model_location="./GradientBoosting"

    if(model=="adaboost"):
        model_location="./AdaBoost"

    if(model=="logreg"):
        model_location="./LogRegr"

    if(model=="svm"):
        model_location="./SVM"

    if(rep=="word2vec"):
        model_location=model_location+".sav"
        print(model_location)
        return w2VecModel.predictCategory(text,model_location)
    # tfidf
    elif(rep=="tfidf"):
        model_location=model_location+"Tdif.sav"
        print(model_location)
        return w2VecModel.predictCategoryTfidf(text,model_location)
# rep=word2vec/tfidf
# model=adaboost/extratree/gradientboosting/logreg/svm;

app=Flask(__name__)
@app.route('/articles',methods=["GET"])
def getAll():
    d = getAllFromDb()
    for el in d:
        del el['_id']
    return jsonify(d)

@app.route('/articles',methods=["POST"])
def postArticle():
    title=request.form.get('title')
    text=request.form.get('text')
    model=request.form.get('model')
    rep=request.form.get('rep')


    category=getArticleClassification(text,model,rep)
    
    article={"title":title,"text":text,"category":category}

    addArticleToDb(article)
    del article['_id']
    return jsonify(article)

if __name__=="__main__":
    app.run(debug=True,host='0.0.0.0')