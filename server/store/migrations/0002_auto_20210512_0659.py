# Generated by Django 3.2 on 2021-05-12 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='cover_image',
            field=models.URLField(default=[]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='item',
            name='images',
            field=models.JSONField(default='[]'),
            preserve_default=False,
        ),
    ]
