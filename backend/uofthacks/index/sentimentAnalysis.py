from google.cloud import language

from google.cloud.language import enums

import six

with open ("textfile.txt", "r") as readfile:
    r = readfile.readlines()


counter = 0
pos_counter = 0
neg_counter = 0



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


sentiment, entities = analysis_text(r[counter])
print(sentiment.score, sentiment.magnitude)

for e in entities:
    entity_type = enums.Entity.Type(e.type)
    print(e.name, entity_type.name, e.salience)