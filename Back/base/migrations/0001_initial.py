# Generated by Django 4.1 on 2022-08-28 09:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AirlineCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('destination_picture', models.ImageField(blank=True, null=True, upload_to='destinations')),
                ('departure_time', models.DateTimeField()),
                ('landing_time', models.DateTimeField()),
                ('remaining_tickets', models.IntegerField()),
                ('price', models.FloatField()),
                ('airline_company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.airlinecompany')),
                ('destination_country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destination_country', to='base.country')),
                ('origin_country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='origin_country', to='base.country')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no_of_tickets_purchased', models.IntegerField(default=1)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('flight', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.flight')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=200)),
                ('phone_no', models.CharField(max_length=20, unique=True)),
                ('credit_card_no', models.CharField(max_length=20, unique=True)),
                ('profile_picture', models.ImageField(upload_to='profiles')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='airlinecompany',
            name='country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.country'),
        ),
        migrations.AddField(
            model_name='airlinecompany',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
