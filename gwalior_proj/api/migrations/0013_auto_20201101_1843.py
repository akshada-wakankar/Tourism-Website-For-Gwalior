# Generated by Django 3.1 on 2020-11-01 13:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20201101_1656'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='complete',
            new_name='ordered',
        ),
    ]
