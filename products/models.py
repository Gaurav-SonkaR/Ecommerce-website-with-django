from django.db import models
from django.contrib.auth.models import User

class Products(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='products')
    stock = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    category = models.CharField(max_length=255)