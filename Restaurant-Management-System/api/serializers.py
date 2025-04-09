from rest_framework import serializers
from .models import Restaurant,  Food,Menu, OrderItem, Order, Receipt, Payment,Review

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        # fields = '__all__'
        exclude = ['menu']
        
class MenuSerializer(serializers.ModelSerializer):
    # foods = serializers.PrimaryKeyRelatedField(queryset=Food.objects.all(), many=True)
    foods = FoodSerializer(many=True, read_only=True)
    class Meta:
        model = Menu
        fields = '__all__'

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
