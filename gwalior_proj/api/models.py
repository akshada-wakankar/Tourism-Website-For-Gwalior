from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.conf import settings
from datetime import date
from django.db.models.signals import post_save
# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


class Hotel(models.Model):
    name = models.CharField(max_length=30, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=500, null=True, blank=True)
    safetyrating = models.IntegerField(null=True, blank=True)
    stars = models.IntegerField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    contactno = models.CharField(max_length=255, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = 'static/images/ph2.png'
        return url

    def __str__(self):
        return self.name


class Room(models.Model):
    hotel = models.ForeignKey(
        Hotel, on_delete=models.SET_NULL, blank=True, null=True)
    roomtype = models.CharField(max_length=50, null=True, blank=True)
    price = models.FloatField()
    image = models.ImageField(null=True, blank=True)
    slug = models.SlugField(null=True, blank=True)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = 'static/images/ph2.png'
        return url

    def __str__(self):
        return str(self.roomtype)

    def get_absolute_url(self):
        return reverse("api:product", kwargs={
            'slug': self.slug
        })

    def get_add_to_cart_url(self):
        return reverse("api:add-to-cart", kwargs={
            'slug': self.slug
        })

    def get_remove_from_cart_url(self):
        return reverse("api:remove-from-cart", kwargs={
            'slug': self.slug
        })

    def get_hotel_name(self):
        return str(self.hotel.name)


class OrderRoom(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    numberofrooms = models.IntegerField(default=1, null=True, blank=True)
    start_date = models.CharField(max_length=100, null=True, blank=True)
    numberofdays = models.IntegerField(default=1, null=True, blank=True)

    def get_total_room_price(self):
        return self.numberofrooms*self.room.price*self.numberofdays


class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    date_booked = models.DateTimeField(auto_now_add=True)
    rooms = models.ManyToManyField(OrderRoom)
    ordered = models.BooleanField(default=False, null=True, blank=True)
    transaction_id = models.CharField(max_length=200, null=True)
    ordered_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.user)

    @property
    def get_cart_total(self):
        orderitems = self.rooms_set.all()
        total = sum([item.get_total for item in orderitems])
        return total

    @property
    def get_cart_items(self):
        orderitems = self.rooms_set.all()
        total = len([item.quantity for item in orderitems])
        return total

    def get_total(self):
        total = 0
        for order_room in self.rooms.all():
            total += order_room.get_total_room_price()
        return total


class Places(models.Model):
    name = models.CharField(max_length=30, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    time = models.CharField(max_length=100, null=True, blank=True)
    distance = models.IntegerField(default=0, null=True, blank=True)
    fee = models.CharField(max_length=200, null=True, blank=True)
    maplink = models.CharField(max_length=500, null=True, blank=True)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = 'static/images/ph2.png'
        return url

    def __str__(self):
        return self.name


class Restaurants(models.Model):
    name = models.CharField(max_length=30, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    maplink = models.CharField(max_length=500, null=True, blank=True)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = 'static/images/ph2.png'
        return url

    def __str__(self):
        return self.name


class Review(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    detail = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Review'

    def __str__(self):
        return self.name
