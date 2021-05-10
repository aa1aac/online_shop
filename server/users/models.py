from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField(
        blank=False, max_length=256, verbose_name='email address', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    isSeller = models.BooleanField(default=False)
    UNIQUE_FIELDS = ['email']
