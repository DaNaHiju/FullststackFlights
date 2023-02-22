from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.
# admin.site.register(Administrator)
admin.site.register(Ticket)
# admin.site.register(Customer)
admin.site.register(Flight)
admin.site.register(AirlineCompany)
# admin.site.register(User_Roles)
admin.site.register(Country)
admin.site.register(Profile)
admin.site.register(FlightImage)




