# Generated by Django 3.1 on 2020-10-27 10:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20201022_1904'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='contactno',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='hotel',
            name='description',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('safety_rating', models.IntegerField(default=0)),
                ('hotel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.hotel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customer')),
            ],
            options={
                'verbose_name_plural': 'Review',
            },
        ),
    ]