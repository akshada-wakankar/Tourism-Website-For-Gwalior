# Generated by Django 3.1 on 2020-10-28 09:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20201027_2133'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='booked',
        ),
        migrations.RemoveField(
            model_name='room',
            name='number',
        ),
        migrations.RemoveField(
            model_name='room',
            name='order',
        ),
        migrations.RemoveField(
            model_name='room',
            name='user',
        ),
        migrations.CreateModel(
            name='OrderRoom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ordered', models.BooleanField(default=False)),
                ('numberofrooms', models.IntegerField(blank=True, default=1, null=True)),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('numberofdays', models.IntegerField(blank=True, default=1, null=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.order')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.customer')),
            ],
        ),
    ]
