from django.http import HttpResponse
import backend.uofthacks.indexx.sentimentAnalysis as sa
# from django.shortcuts import render
# import pyrebase
# import json
import os
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    if request.method == 'POST':
        sa.main()
        return HttpResponse("Got it")

    return HttpResponse("Waiting for signal")



