# Generated by Django 3.1 on 2020-11-09 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20201106_1851'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderroom',
            name='start_date',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
