from rest_framework import serializers
from .models import *

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class FoodSerializer(serializers.ModelSerializer):
    # menu=MenuSerializer(many=true)
    # menu = serializers.StringRelatedField(many=True)
    # menu=serializers.SerializerMethodField()
    menu = 'MenuSerializer'
    class Meta:
        model = Food
        fields = '__all__'
        # exclude = ['menu']

    def get_menu(self, obj):
        return MenuSerializer(obj.menu_set.all(), many=True).data

        
class MenuSerializer(serializers.ModelSerializer):
    # foods = serializers.PrimaryKeyRelatedField(queryset=Food.objects.all(), many=True)
    foods = FoodSerializer(many=True, read_only=True)
    class Meta:
        model = Menu
        fields = ['id','name',"restaurant",'foods','category','description','image','is_active']
        # exclude=['foods',]

class ReservationSerializer(serializers.ModelSerializer):
    # tables='TableSerializer'
    class Meta:
        model=Reservation
        fields='__all__'

class TableSerializer(serializers.ModelSerializer):
    tables=RestaurantSerializer(many=True,read_only=True)
    class Meta:
        model=Table
        fields='__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    foods = FoodSerializer(many=True, read_only=True)
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    # items = serializers.PrimaryKeyRelatedField(queryset=OrderItem.objects.all(),many=True)
    items=OrderItemSerializer(many=True,read_only=True)
    foods = FoodSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    food=FoodSerializer()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'food', 'quantity', 'total_price']

    def get_total_price(self, obj):
        return obj.food.price * obj.quantity


class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Payment
        fields = '__all__'
