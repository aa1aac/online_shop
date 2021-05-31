from django.contrib.auth import get_user_model
from django.db import models
import uuid
from django.db.models.deletion import CASCADE

from django.db.models.fields.related import ForeignKey


class Item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item_name = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.TextField()
    images = models.JSONField()
    seller = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    cover_image = models.URLField()


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    belongsTo = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    total = models.FloatField(null=False, default=0.0)


class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    item = ForeignKey(Item, on_delete=models.CASCADE)
    cart = ForeignKey(Cart, on_delete=models.CASCADE,)
    sold = models.BooleanField(default=False)
