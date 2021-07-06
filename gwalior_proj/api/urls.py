from django.urls import path, include
from . import views
from django.contrib import admin
from django.conf.urls import url
from api.views import *

addtocart = AddToCartView.as_view({'post': 'view_post'})
urlpatterns = [

    path('hotelrooms/', HotelListView.as_view(), name="hotel-list"),
    path('review/', ReviewView.as_view(), name="review-list"),
    path('places/', PlacesListView.as_view(), name="places-list"),
    path('retaurants/', RestListView.as_view(), name="rest-list"),
    path('hotelrooms/<pk>/', HotelDetailView.as_view(), name="hotel-detail"),
    path('add_to_cart/', addtocart, name="add_to_cart"),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),


]
