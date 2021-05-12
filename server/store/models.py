from django.contrib.auth import get_user_model
from django.db import models
import uuid


class Item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item_name = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.TextField()
    images = models.JSONField()
    seller = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    cover_image = models.URLField()
