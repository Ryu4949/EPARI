from django.db import models
from epari_backend import settings
from locations.models import Location

# Create your models here.
class Plant(models.Model):
    plantId = models.IntegerField(primary_key=True)
    plantName = models.CharField(max_length=50)
    detailPictureUrl = models.CharField(max_length=500)
    plantDescription = models.TextField()

class Collect(models.Model):
    collectId = models.AutoField(primary_key=True)
    plantId = models.ForeignKey(Plant, on_delete=models.CASCADE, related_name="collection")
    collectPictureUrl = models.CharField(max_length=500)
    userId = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="collection")
    collectDate = models.DateField(auto_now_add=True)
    collectTitle = models.CharField(max_length=100)
    collectContent = models.TextField()
    collectPlace = models.CharField(max_length=50)
    locationId = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="collection")