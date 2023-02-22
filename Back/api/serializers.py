from django.contrib.auth.models import Group
from dataclasses import fields
from rest_framework import serializers
from base.models import Country, AirlineCompany, Flight, FlightImage, Ticket
from django.contrib.auth import get_user_model


User = get_user_model()


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = "__all__"


class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        exclude = ["customer"]


class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

        extra_kwargs = {
            'password': {'write_only': True},
            # 'another_field': {'read_only': True}
        }


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "password"]

        extra_kwargs = {
            'password': {'write_only': True},
            # 'another_field': {'read_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        customer_group = Group.objects.get(name='Customer')
        instance = self.Meta.model(**validated_data)

        # Adding the below line made it work for me.
        instance.is_active = True
        if password is not None:
            # Set password does the hash, so you don't need to call make_password
            instance.set_password(password)
        instance.save()
        instance.groups.add(customer_group)
        instance.save()
        return instance


class AirlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = AirlineCompany
        fields = "__all__"


class CreateFlightSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flight
        fields = "__all__"


class FlightImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightImage
        fields = '__all__'


class UploadImageOfFlightSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlightImage
        fields = "__all__"

        extra_kwargs = {
            'id': {'read_only': True},
            # 'another_field': {'read_only': True}
        }


class ListFlightSerializer(serializers.ModelSerializer):

    origin_country = CountrySerializer(read_only=True)
    destination_country = CountrySerializer(read_only=True)
    airline_company = AirlineSerializer(read_only=True)
    image = UploadImageOfFlightSerializer(read_only=True)

    class Meta:
        model = Flight
        fields = "__all__"
