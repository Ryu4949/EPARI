from django.db import models

# Create your models here.
class Location(models.Model):
    locationId = models.AutoField(primary_key=True)
    areaName = models.CharField(max_length=50)
    sigunguName = models.CharField(max_length=50)