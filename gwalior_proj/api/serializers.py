from rest_framework import serializers
from .models import *


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'location', 'address',
                  'safetyrating', 'stars', 'image']


'''
    def get_image_url(self, hotel):
        request = self.context.get('request')
        image_url = hotel.image.url
        return request.build_absolute_uri(image_url)

        image_url = serializers.SerializerMethodField()
'''


class RoomSerializer(serializers.ModelSerializer):
    hotel_name = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ['id', 'roomtype', 'price', 'image', 'slug', 'hotel_name']

    def get_hotel_name(self, obj):
        return obj.get_hotel_name()


class HotelDetailSerializer(serializers.ModelSerializer):
    rooms = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = ['id', 'name', 'location', 'address',
                  'safetyrating', 'stars', 'image', 'rooms']

    def get_rooms(self, obj):
        return RoomSerializer(obj.room_set.all(), many=True).data


class OredrRoomSerializer(serializers.ModelSerializer):
    room = StringSerializer()
    room_obj = serializers.SerializerMethodField()
    total_room_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderRoom
        fields = (
            'id', 'room', 'numberofrooms', 'numberofdays', 'room_obj', 'total_room_price',
        )

    def get_room_obj(self, obj):
        return RoomSerializer(obj.room).data

    def get_total_room_price(self, obj):
        return obj.get_total_room_price()


class OrderSerializer(serializers.ModelSerializer):
    order_rooms = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ('id', 'order_rooms', 'total')

    def get_order_rooms(self, obj):
        return OredrRoomSerializer(obj.rooms.all(), many=True).data

    def get_total(self, obj):
        return obj.get_total()


class PlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = ['id', 'name', 'location', 'time',
                  'distance', 'fee', 'image', 'description', 'maplink']


class RestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ['id', 'name', 'location', 'image', 'description', 'maplink']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['name', 'detail']
