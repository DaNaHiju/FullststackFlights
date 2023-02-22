from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model


User = get_user_model()
# Create your models here.


# class User(AbstractUser):
#     pass


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    profile_picture = models.ImageField(upload_to="profiles")


class Country(models.Model):
    name = models.CharField(max_length=40, unique=True)

    def __str__(self):
        return self.name


class AirlineCompany(models.Model):
    name = models.CharField(max_length=40, unique=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Flight(models.Model):
    
    airline_company = models.ForeignKey(
        AirlineCompany, on_delete=models.CASCADE)
    origin_country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name="origin_country")
    destination_country = models.ForeignKey(
        Country, on_delete=models.CASCADE, related_name="destination_country")
    departure_time = models.DateTimeField()
    landing_time = models.DateTimeField()
    remaining_tickets = models.IntegerField()
    price = models.FloatField()
    image = models.OneToOneField("FlightImage", on_delete=models.CASCADE, null=True, blank=True, default=None)

class FlightImage(models.Model):

    

    destination_picture = models.ImageField(
        upload_to="destinations", null=True, blank=True)



class Ticket(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    no_of_tickets_purchased = models.IntegerField(
        default=1, null=False, blank=False)

    address = models.CharField(max_length=200, null=True, blank=True)
    phone_no = models.CharField(max_length=20, unique=True, null=True, blank=True)
    credit_card_no = models.CharField(max_length=20, unique=True, null=True, blank=True)
