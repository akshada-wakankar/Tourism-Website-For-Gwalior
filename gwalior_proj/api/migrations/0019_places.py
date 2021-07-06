# Generated by Django 3.1 on 2020-12-11 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20201109_2207'),
    ]

    operations = [
        migrations.CreateModel(
            name='Places',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=30, null=True)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('location', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('time', models.CharField(blank=True, max_length=100, null=True)),
                ('distance', models.IntegerField(blank=True, default=0, null=True)),
                ('fee', models.CharField(blank=True, max_length=200, null=True)),
                ('maplink', models.CharField(blank=True, max_length=500, null=True)),
            ],
        ),
    ]