from rest_framework import serializers
from .models import *
from authapp.serializers import UserSerializer

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'



class MenuSerializer(serializers.ModelSerializer):
    foods = serializers.SerializerMethodField()
    restaurant = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ['id', 'name', 'restaurant', 'foods', 'category', 'description', 'image', 'is_active']

    def get_restaurant(self, obj):
        return {
            'id': obj.restaurant.id,
            'name': obj.restaurant.name
        }

    def get_foods(self, obj):
        return obj.foods.all().values()


# 3. Food Serializer
class FoodSerializer(serializers.ModelSerializer):
    menus = serializers.SerializerMethodField()
    restaurants = serializers.SerializerMethodField()

    class Meta:
        model = Food
        fields = '__all__'

    def get_menus(self, obj):
        return list(obj.menus.values('id', 'name', 'category', 'description', 'image', 'is_active'))

    def get_restaurants(self, obj):
        restaurants = {menu.restaurant for menu in obj.menus.all()}
        return [
            {'id': r.id, 'name': r.name}
            for r in restaurants
        ]



class ReservationSerializer(serializers.ModelSerializer):
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

    def update(self, instance, validated_data):
        quantity = validated_data.get('quantity', instance.quantity)
        instance.quantity = quantity
        instance.save()
        return instance

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
    user=UserSerializer()
    class Meta:
        model = Payment
        fields = '__all__'
