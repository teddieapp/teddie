from django.shortcuts import render
from google.cloud import language
from google.cloud.language import enums

import pyrebase
import six
import datetime
import json

with open ("textfile.txt", "r") as readfile:
    r = readfile.readlines()


counter = 0
pos_counter = 0
neg_counter = 0


config = {
    'apiKey' : "AIzaSyCOSgZg_IT4ddlFlgPBCAm99Kd-ZhKjqkY",
    'authDomain' : "uofthacks-aa0ee.firebaseapp.com",
    'databaseURL': "https://uofthacks-aa0ee.firebaseio.com",
    'projectId': "uofthacks-aa0ee",
    'storageBucket': "uofthacks-aa0ee.appspot.com",
    'messagingSenderId': "577016302846"
}

firebase = pyrebase.initialize_app(config);

auth = firebase.auth()

db = firebase.database()

def analysis_text(content):
    client = language.LanguageServiceClient()

    if isinstance(content, six.binary_type):
        content = content.decode('utf-8')

    type_ = enums.Document.Type.PLAIN_TEXT
    document = {'type': type_, 'content': content}

    response = client.analyze_sentiment(document)
    sentiment = response.document_sentiment

    entities = client.analyze_entities(document).entities
    return sentiment, entities

def main():
    sentiment, entities = analysis_text(r[counter])
    print(sentiment.score, sentiment.magnitude)

    ename = []
    etype = []
    esal = []




    import time
    date = time.strftime("%Y,%m,%d,%H,%M,%S")



    data = {'date':  date, 'sentiment': sentiment.score}
    dcounter = 0
    did = db.child("data").get()

    if did is not None :
        for a in did.each():
            dcounter += 1

    db.child("data").child("data"+str(dcounter)).set(data)
    entitySet = []
    ecounter = 0
    for e in entities:
        entity_type = enums.Entity.Type(e.type)
        entity = []
        entity.append(e.name)
        entity.append(',')
        entity.append(entity_type.name)
        entity.append(',')
        entity.append(str(e.salience))

        entityStr = ''.join(entity)
        entry = 'entry'  + str(ecounter)
        endata = {entry: entityStr}

        ecounter +=1
        entitySet.append(endata)

    db.child("data").child("data"+str(dcounter)).child("entities").set(entitySet)

