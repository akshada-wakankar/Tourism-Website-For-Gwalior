from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, RetrieveAPIView)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from .models import *
from django.utils import timezone
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from rest_framework import viewsets
# Create your views here.


class HotelListView(ListAPIView):
    permissions_classes = (AllowAny)
    serializer_class = HotelSerializer
    queryset = Hotel.objects.all()

    def get(self, request):
        detail = [{"id": detail.id, "name": detail.name, "location": detail.location, "address": detail.address, "safetyrating": detail.safetyrating, "stars": detail.stars, "image": detail.imageURL}
                  for detail in Hotel.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class HotelDetailView(RetrieveAPIView):
    permissions_classes = (AllowAny)
    serializer_class = HotelDetailSerializer
    imageURL = Hotel.imageURL
    queryset = Hotel.objects.all()


class AddToCartView(viewsets.ModelViewSet):
    permissions_classes = (AllowAny)

    def view_post(self, request, *args, **kwargs):
        print("heyyhiiii")
        slug = request.data.get('slug', None)
        nooofdays = request.data.get('noofdays', None)
        startdate = request.data.get('startdate', None)
        print(startdate)
        print(nooofdays)
        print("heyyh11", slug)
        if slug is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)
            print("heyyhi22")
        room = get_object_or_404(Room, slug=slug)
        print("heyyh33", room, request.user.username)
        order_room, created = OrderRoom.objects.get_or_create(
            room=room, user=request.user, ordered=False)
        print("heyyh4444i")
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        print("heyy55i")
        if order_qs.exists():
            order = order_qs[0]
            if order.rooms.filter(room__slug=room.slug).exists():
                print("hii66")
                order_room.numberofdays = nooofdays
                order_room.start_date = str(startdate)
                print(order_room.start_date)
                print(order_room.numberofdays)
                order_room.numberofrooms += 1
                order_room.save()
                return Response(HTTP_200_OK)
            else:
                order.rooms.add(order_room)
                return Response(HTTP_200_OK)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.rooms.add(order_room)
            return Response(status=HTTP_200_OK)


class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id}, status=HTTP_200_OK)


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            return order
        except ObjectDoesNotExist:
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class PlacesListView(ListAPIView):
    permissions_classes = (AllowAny)
    serializer_class = PlacesSerializer
    queryset = Places.objects.all()

    def get(self, request):
        detail = [{"id": detail.id, "name": detail.name, "location": detail.location, "image": detail.imageURL, "description": detail.description, "time": detail.time, "distance": detail.distance, "fee": detail.fee, "maplink": detail.maplink}
                  for detail in Places.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = PlacesSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class RestListView(ListAPIView):
    permissions_classes = (AllowAny)
    serializer_class = RestSerializer
    queryset = Restaurants.objects.all()

    def get(self, request):
        detail = [{"id": detail.id, "name": detail.name, "location": detail.location, "image": detail.imageURL, "description": detail.description,  "maplink": detail.maplink}
                  for detail in Restaurants.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = RestSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ReviewView(APIView):

    serializer_class = ReviewSerializer

    def get(self, request):
        detail = [{"name": detail.name, "detail": detail.detail}
                  for detail in Review.objects.all()]
        return Response(detail)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
