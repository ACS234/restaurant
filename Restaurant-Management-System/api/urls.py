from django.urls import path
from .views import *

urlpatterns = [
    path('restaurants/', RestaurantAPIView.as_view(), name='restaurant_list'),
    path('restaurants/<int:pk>/qr/', RestaurantQRAPIView.as_view(), name='restaurant_qr'),
    path('foods/', FoodAPIView.as_view(), name='food_list'),
    path('foods/<int:pk>/', FoodDetailAPIView.as_view(), name='food_detail'),
    path('orders/', OrderAPIView.as_view(), name='order_list'),
    path('orders/<int:pk>/', OrderDetailAPIView.as_view(), name='order_detail'),
    path('menus/', MenuAPIView.as_view(), name='menu_list'),
    path('menus/<int:pk>/', MenuDetailAPIView.as_view(), name='menu_detail'),
    path('orders/items/', OrderItemAPIView.as_view(), name='order_item'),
    path('cart/', CartItemCreateView.as_view(), name='add-to-cart'),
    path('cart/<int:pk>/', CartDetailAPIView.as_view(), name='detail-cart'),
    path('cart/<int:pk>/remove/', CartDetailAPIView.as_view(), name='delete-cart'),
    path('cart/<int:pk>/update/', CartDetailAPIView.as_view(), name='update-cart'),
    path('book/', ReservationAPIView.as_view(), name='reservation-book'),
    path('orders/<int:order_id>/status/', OrderStatusAPIView.as_view(), name='order_status'),
    path('payments/', PaymentAPIView.as_view(), name='payment'),
    path('orders/<int:order_id>/receipt/', GenerateReceiptAPIView.as_view(), name='generate_receipt'),
    path('reviews/', ReviewAPIView.as_view(), name='review_list'),
    path('order/<int:restaurant_id>/<int:table_id>/', MenusAPIView.as_view(), name='menu_qr'),
    path('get_table/',TableAPIView.as_view(),name='table'),
    path('get_table/<int:id>/',TableDetail.as_view(),name='get_table'),
    path('foods/search/',SearchFoodAPIView.as_view(),name='search_food'),
    path('foods/categories/',GetCategory.as_view(),name='categories'),
    path('reservations/',ReservationAPIView.as_view(),name='reservations'),
    #
    path('order/', QROrderView.as_view(), name='order'),  
    path('order/confirmation/<int:order_id>/', OrderConfirmationView.as_view(), name='order_confirmation'), 
]
