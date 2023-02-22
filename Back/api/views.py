from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.
from base.models import Country, AirlineCompany, Flight, FlightImage, Ticket
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication
from .serializers import CountrySerializer, CreateTicketSerializer, ListUserSerializer, AirlineSerializer, CreateFlightSerializer, ListFlightSerializer, RegisterUserSerializer, TicketSerializer, UploadImageOfFlightSerializer

from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.contrib.auth.models import Group

User = get_user_model()


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def get_permissions(self):
        """Set custom permissions for each action."""
        if self.action == "list":
            self.permission_classes = [AllowAny, ]

        elif self.action == "retrieve":
            self.permission_classes = [AllowAny, ]

        elif self.action == "create":
            self.permission_classes = [IsAuthenticated, ]
        elif self.action == "update":
            self.permission_classes = [IsAuthenticated, ]

        return super().get_permissions()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    # serializer_class = ListUserSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return ListUserSerializer
        if self.action == 'retrieve':
            return ListUserSerializer
        if self.action == "create":
            return RegisterUserSerializer

        return RegisterUserSerializer

    def get_permissions(self):
        """Set custom permissions for each action."""
        if self.action == "list":
            self.permission_classes = [IsAuthenticated, ]

        elif self.action == "retrieve":
            self.permission_classes = [IsAuthenticated, ]

        elif self.action == "create":
            self.permission_classes = [AllowAny, ]
        elif self.action == "update":
            self.permission_classes = [IsAuthenticated, ]

        return super().get_permissions()


class AirlineViewSet(viewsets.ModelViewSet):
    queryset = AirlineCompany.objects.all()
    serializer_class = AirlineSerializer
    permission_classes = [IsAuthenticated]


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]
    # authentication_classes = [SessionAuthentication]

    def get_serializer_class(self):
        if self.action == 'list':
            return TicketSerializer
        if self.action == 'retrieve':
            return TicketSerializer
        if self.action == "create":
            return CreateTicketSerializer

        return CreateFlightSerializer

    def perform_create(self, serializer):
        flight = serializer.validated_data.get("flight")
        no_of_tickets_purchased = serializer.validated_data.get(
            "no_of_tickets_purchased")
        current_user = serializer.context["request"].user

        current_flight: Flight = Flight.objects.get(pk=flight.id)
        current_flight.remaining_tickets = current_flight.remaining_tickets - \
            no_of_tickets_purchased
        current_flight.save()

        # print(current_flight)
        # Flight.objects.get
        serializer.save(customer=current_user)


class FlightViewSet(viewsets.ModelViewSet):

    filter_backends = [DjangoFilterBackend]
    search_fields = ['destination_country', 'origin_country']
    # parser_classes = [MultiPartParser, FormParser]


    @action(detail=False, methods=['post'])
    def image_upload(self, request):

        try:
            file = request.data['file']
        except KeyError:
            raise ParseError('Request has no resource file attached')

            
        flight_image = FlightImage.objects.create(destination_picture=file)


        serializer = UploadImageOfFlightSerializer(flight_image)
        return Response(serializer.data)

    def get_permissions(self):
        """Set custom permissions for each action."""
        if self.action == "list":
            self.permission_classes = [AllowAny, ]

        elif self.action == "retrieve":
            self.permission_classes = [AllowAny, ]

        elif self.action == "create":
            self.permission_classes = [IsAuthenticated, ]
        elif self.action == "update":
            self.permission_classes = [IsAuthenticated, ]

        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'list':
            return ListFlightSerializer
        if self.action == 'retrieve':
            return ListFlightSerializer
        if self.action == "create":
            return CreateFlightSerializer
        if self.action == "image_upload":
            return UploadImageOfFlightSerializer

        return CreateFlightSerializer

    def get_queryset(self):

        queryset = Flight.objects.filter()
        origin_country = self.request.query_params.get('origin_country')
        destination_country = self.request.query_params.get(
            'destination_country')

        from__ = self.request.query_params.get('from')
        to = self.request.query_params.get('to')

        if origin_country is not None:
            queryset = queryset.filter(origin_country__name=origin_country)
        if destination_country is not None:
            queryset = queryset.filter(
                destination_country__name=destination_country)

        if from__ is not None:
            queryset = queryset.filter(departure_time__gte=from__)

        if to is not None:
            queryset = queryset.filter(landing_time__lte=to)

        return queryset
