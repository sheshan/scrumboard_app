from django.shortcuts import render
from rest_framework import serializers

from serializers import CardSerializer, ListSerializer
from .models import List, Card
from drf_multiple_model.views import ObjectMultipleModelAPIView
# Create your views here.

