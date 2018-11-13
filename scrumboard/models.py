from django.db import models

# Create your models here.

class  List(models.Model):
    name = models.CharField(max_length=50) # cretaes table list

    def __str__(self):
        return "List : {}".format(self.name) # returns list values

class Card(models.Model): # to create card table
    title = models.CharField(max_length=100)#  field title
    description = models.TextField(blank=True) # field description
    list = models.ForeignKey(List, related_name = "cards" ,on_delete=models.PROTECT) # creating a foriegn key for storing list
    story_points = models.IntegerField(null=True, blank = True)
    business_value = models.IntegerField(null=True, blank = True)
    def __str__(self):
        return "Card : {}".format(self.title)
