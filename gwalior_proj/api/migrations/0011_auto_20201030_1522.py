# Generated by Django 3.1 on 2020-10-30 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_room_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderroom',
            name='order',
        ),
        migrations.AddField(
            model_name='order',
            name='rooms',
            field=models.ManyToManyField(to='api.OrderRoom'),
        ),
    ]
