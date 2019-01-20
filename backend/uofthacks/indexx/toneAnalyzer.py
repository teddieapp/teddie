from watson_developer_cloud import ToneAnalyzerV3
import time
import json

tone_analyzer = ToneAnalyzerV3(
    iam_apikey='nS9bchHnTmfO9PCuQ3Z5APPuASzSFPmTcdVDnSG2Tm5P',
    version='2019-01-20')

hello = "The book is about the months the Ingalls family spent on the Kansas prairie, around the town of Independence."

json_output = tone_analyzer.tone(hello).get_result()

print(json_output)