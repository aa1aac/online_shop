# Generated by Django 3.2 on 2021-05-21 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_rename_cartitem_cart_belongsto'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='total',
            field=models.FloatField(default=0.0),
        ),
    ]