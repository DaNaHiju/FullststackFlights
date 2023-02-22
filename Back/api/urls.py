from distutils.command.upload import upload
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, TicketViewSet, UserViewSet, AirlineViewSet, FlightViewSet
router = DefaultRouter()

router.register("countries", CountryViewSet, basename="countries")
router.register("users", UserViewSet, basename="users")
router.register("airlines", AirlineViewSet, basename="airlines")
router.register("flights", FlightViewSet, basename="flights")
router.register("tickets", TicketViewSet, basename="tickets")
# router.register("upload-flight-image", UploadFlightImageViewset, basename="upload-flight-image")

# urlpatterns = [
#     path('upload_flight_image', uploadf_flight_image, name='upload_flight_image'),
# ]

urlpatterns = router.urls
