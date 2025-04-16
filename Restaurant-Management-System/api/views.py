import qrcode
import stripe
from io import BytesIO
from django.core.files.base import ContentFile
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, render
from django.http import FileResponse
from rest_framework.response import Response
from rest_framework import generics,filters,status
from .models import *
from .serializers import *
from django.template.loader import render_to_string
import pdfkit
import os
from django.conf import settings
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile

stripe.api_key = settings.STRIPE_SECRET_KEY
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction

# Search API for Food And Menu
class SearchFoodAPIView(generics.ListAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name','category', 'is_vegetarian']
        
#  Restaurant API
class RestaurantAPIView(APIView):
    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')
        location = request.data.get('location')
        contact_number = request.data.get('contact_number')
        
        if Restaurant.objects.filter(name=name).exists():
            return Response({"error": "A restaurant with this name already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        restaurant = Restaurant.objects.create(
            name=name,
            location=location,
            contact_number=contact_number
        )
        
        qr = qrcode.make(f"Restaurant Menu: {restaurant.name}")
        buffer = BytesIO()
        qr.save(buffer, format="PNG")
        
        restaurant.qr_code.save(f"qr_{restaurant.id}.png", ContentFile(buffer.getvalue()), save=False)
        restaurant.save() 

        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class RestaurantQRAPIView(APIView):
    def get(self, request, pk):
        restaurant = get_object_or_404(Restaurant, pk=pk)
        return FileResponse(open(restaurant.qr_code.path, "rb"), content_type="image/png")
    
class GenerateQRCodeAPIView(APIView):
    def get(self, request, restaurant_id, table_id):
        table = Table.objects.get(id=table_id, restaurant_id=restaurant_id)
        qr_url = table.get_qr_code_url()

        qr_code = qrcode.make(qr_url)

        response = HttpResponse(content_type="image/png")
        qr_code.save(response, "PNG")
        return response

#  Food API
class FoodAPIView(APIView):
    def get(self, request):
        foods = Food.objects.all()
        total=foods.count()
        serializer = FoodSerializer(foods, many=True)
        return Response({"message":"Foods gets Successfully","total":total,"data":serializer.data},status=status.HTTP_200_OK)


    def post(self, request):
        data = request.data.copy()
        img = request.FILES.get('img')

        if img:
            with Image.open(img) as img_file:
                resized_img = img_file.resize((300, 300))

                img_io = BytesIO()
                resized_img.save(img_io, format='JPEG') 
                img_io.seek(0)

                resized_image = InMemoryUploadedFile(
                    img_io, 
                    None, 
                    'resized_img.jpg', 
                    'image/jpeg', 
                    img_io.getbuffer().nbytes, 
                    None
                )
                
                data['image'] = resized_image

        serializer = FoodSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class FoodDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            foods=Food.objects.get(pk=pk)
            serializer = FoodSerializer(foods)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        food = get_object_or_404(Food, pk=pk)
        serializer = FoodSerializer(food, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# Menu API
class MenuAPIView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer=MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# for qr code
class MenusAPIView(APIView):
    def get(self, request, restaurant_id, table_id):
        restaurant = Restaurant.objects.get(id=restaurant_id)
        table = Table.objects.get(id=table_id, restaurant=restaurant)

        menu_items = restaurant.menus.all()

        serializer = MenuSerializer(menu_items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class MenuDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            menu=Menu.objects.prefetch_related('foods').get(pk=pk)
            serializer = MenuSerializer(menu)
            return Response({"data":serializer.data},status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        menu = get_object_or_404(Menu, pk=pk)
        serializer = MenuSerializer(menu, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TableAPIView(APIView):
    def get(self, request):
        try:
            tables = Table.objects.all()
            serializer = TableSerializer(tables, many=True)  
            return Response({"message":"Your Tables","data": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CartItemCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user).select_related('food')
        serializer = CartItemSerializer(cart_items, many=True)
        return Response({"data": serializer.data, "total": cart_items.count()}, status=status.HTTP_200_OK)

    def post(self, request):
        food_id = request.data.get('food')
        quantity = request.data.get('quantity', 1)

        food = get_object_or_404(Food, id=food_id)

        cart_item = CartItem.objects.create(food=food, quantity=quantity, user=request.user)
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    def put(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)
        cart_item.quantity = request.data.get('quantity', cart_item.quantity)
        cart_item.save()
        return Response({"message": "Cart updated successfully"}, status=status.HTTP_200_OK)

    def delete(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, user=request.user)
        cart_item.delete()
        return Response({"message": "Item removed from cart"}, status=status.HTTP_204_NO_CONTENT)


class CartDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        cart_item = get_object_or_404(CartItem, id=pk, user=request.user)
        serializer = CartItemSerializer(cart_item)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        cart_item = get_object_or_404(CartItem, id=pk, user=request.user)
        serializer = CartItemSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cart_item = get_object_or_404(CartItem, id=pk, user=request.user)
        cart_item.delete()
        return Response({"message": "Cart Item Deleted Successfully"}, status=status.HTTP_204_NO_CONTENT)

class ReservationAPIView(APIView):
    def get(self,request):
        try:
            reservation=Reservation.objects.all()
            serializer=ReservationSerializer(reservation,many=True)
            return Response({"message":"Your reservations","data":serializer.data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            table = serializer.validated_data['table']
            date = serializer.validated_data['reservation_date']
            time = serializer.validated_data['reservation_time']

            # Check if the table is already booked at this date and time
            is_booked = Reservation.objects.filter(
                table=table,
                reservation_date=date,
                reservation_time=time
            ).exists()

            if is_booked:
                return Response(
                    {'error': 'This table is already booked at the selected date and time.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save()
            return Response({'message': 'Booking submitted!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Order API
class OrderAPIView(APIView):
    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)
        
        if not cart_items.exists():
            return Response({'error': 'No items in cart'}, status=status.HTTP_400_BAD_REQUEST)
        
        total_price = sum(item.food.price * item.quantity for item in cart_items)

        order_data = {
            'user': user,
            'total_price': total_price,
        }
        order = Order.objects.create(**order_data)
        
        for item in cart_items:
            order.items.create(food=item.food, quantity=item.quantity)
        
        # Empty the cart after placing the order
        cart_items.delete()

        return Response({'message': 'Order placed successfully', 'order_id': order.id}, status=status.HTTP_201_CREATED)


class OrderDetailAPIView(APIView):
    def get(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        if order.user != request.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def patch(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        if order.user != request.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderItemAPIView(APIView):
    def get(self, request):
        order_id = request.GET.get("order_id")
        if order_id:
            order_items = OrderItem.objects.filter(order_id=order_id)
        else:
            order_items = OrderItem.objects.all()

        serializer = OrderItemSerializer(order_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid():
            food_id = request.data.get("food")
            try:
                food = Food.objects.get(id=food_id)
            except Food.DoesNotExist:
                return Response({"detail": "Food not found"}, status=status.HTTP_404_NOT_FOUND)

            quantity = request.data.get("quantity")
            if not quantity:
                return Response({"detail": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

            order_item = serializer.save()
            return Response(OrderItemSerializer(order_item).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        order_item = get_object_or_404(OrderItem, pk=pk)
        serializer = OrderItemSerializer(order_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        order_item = get_object_or_404(OrderItem, pk=pk)
        order_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Order Status API
class OrderStatusAPIView(APIView):
    def get(self, request, order_id):
        order = get_object_or_404(Order, pk=order_id)
        return Response({"order_status": order.status})

    def patch(self, request, order_id):
        order = get_object_or_404(Order, pk=order_id)
        order.status = request.data.get("status", order.status)
        order.save()
        return Response({"message": "Order status updated", "status": order.status})

# # Payment API
class PaymentAPIView(APIView):
    def post(self, request):
        data = request.data
        user = request.user
        items = data.get('order', [])
        amount = data.get('amount')
        payment_method = data.get('payment_method')
        restaurant_id = data.get('restaurant_id')
        customer_name = data.get('customer_name')
        customer_contact = data.get('customer_contact')

        if not items or not amount or not payment_method or not restaurant_id:
            return Response(
                {"success": False, "error": "Missing required payment information."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)
        except Restaurant.DoesNotExist:
            return Response(
                {"success": False, "error": "Restaurant not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        valid_methods = ['Cash', 'Credit Card', 'UPI', 'Wallet']
        if payment_method not in valid_methods:
            return Response(
                {"success": False, "error": "Invalid payment method."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        

        try:
            # Check if a similar unpaid order already exists
            if not customer_contact or not customer_name:
                return Response(
                    {"success": False, "error": "Missing customer information."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            existing_order = Order.objects.filter(
                restaurant=restaurant,
                user=user,# use it when User model Inherits
                customer_name=customer_name,
                customer_contact=customer_contact,
                status='Pending',
                items__food__in=[item['id'] for item in items]
            ).distinct().first()

            if existing_order:
                existing_payment = Payment.objects.filter(order=existing_order).first()
                if existing_payment and existing_payment.is_paid:
                    return Response(
                        {"success": False, "error": "This order has already been paid."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            with transaction.atomic():
                order = Order.objects.create(
                    restaurant=restaurant,
                    user=user,
                    status='Pending'
                )

                for item in items:
                    food_id = item.get('id')
                    quantity = item.get('quantity')

                    try:
                        food = Food.objects.get(id=food_id)
                    except Food.DoesNotExist:
                        return Response(
                            {"success": False, "error": f"Food item with id {food_id} not found."},
                            status=status.HTTP_404_NOT_FOUND
                        )

                    OrderItem.objects.create(
                        order=order,
                        food=food,
                        quantity=quantity
                    )

                payment = Payment.objects.create(
                    order=order,
                    amount=amount,
                    payment_method=payment_method,
                    is_paid=False
                )

                # Clear user's cart after initiating payment
                CartItem.objects.filter(user=user).delete() #use it when User Model Inheirts in models.py
                CartItem.objects.filter(customer_contact=customer_contact).delete()

                return Response(
                    {
                        "success": True,
                        "order_id": order.id,
                        "payment_id": payment.id,
                        "message": "Order and payment initiated successfully."
                    },
                    status=status.HTTP_201_CREATED
                )

        except Exception as e:
            return Response(
                {"success": False, "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# class PaymentAPIView(APIView):
#     permission_classes=[IsAuthenticated]

#     def get(self, request):
#         payments = Payment.objects.all()
#         serializer = PaymentSerializer(payments, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         data = request.data
#         payment_method = data.get("payment_method")
#         items = data.get("order",[])

#         if Payment.objects.filter(order=items).exists():
#             return Response({"error": "Payment already exists"}, status=status.HTTP_400_BAD_REQUEST)

#         if payment_method == "Stripe":
#             payment_intent_id = data.get("payment_intent_id")
            
#             if not payment_intent_id:
#                 return Response({"error": "Missing payment_intent_id"}, status=status.HTTP_400_BAD_REQUEST)

#             try:
#                 intent = stripe.PaymentIntent.retrieve(payment_intent_id)

#                 if intent.status != "succeeded":
#                     return Response({"error": "Payment not completed"}, status=status.HTTP_400_BAD_REQUEST)

#                 data["amount"] = intent.amount / 100  
#                 data["currency"] = intent.currency
#                 data["stripe_id"] = intent.id
#                 data["is_paid"] = True
#                 data["payment_method"] = intent.payment_method

#             except stripe.error.StripeError as e:
#                 return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         elif payment_method in ["Cash", "UPI", "Bank Transfer"]:
#             if not data.get("amount"):
#                 return Response({"error": "Amount is required for non-Stripe payments"}, status=status.HTTP_400_BAD_REQUEST)

#             data["is_paid"] = True
#             data["stripe_id"] = None  
#             data["currency"] = data.get("currency", "INR") 

#         else:
#             return Response({"error": "Unsupported payment method"}, status=status.HTTP_400_BAD_REQUEST)

#         serializer = PaymentSerializer(data=data)
#         if serializer.is_valid():
#             payment = serializer.save()
#             return Response(PaymentSerializer(payment).data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#  Receipt API (PDF Generation)
class GenerateReceiptAPIView(APIView):
    def get(self, request, order_id):
        order = get_object_or_404(Order, pk=order_id)
        items = order.items.all()

        items_data = []
        total = 0

        for item in items:
            subtotal = item.quantity * item.food.price
            item_data = {
                "name": item.id,
                "quantity": item.quantity,
                "unit_price": item.food.price,
                "subtotal": subtotal,
            }
            items_data.append(item_data)
            total += subtotal

        context = {
            "order_id": order.id,
            "restaurant": order.restaurant.name,
            "customer_name": order.customer_name,
            "date": order.created_at.strftime('%Y-%m-%d %H:%M'),
            "items": items_data,
            "total": total,
        }

        return render(request, "api/receipt.html", context)
    
    def post(self, request, order_id):
        order = get_object_or_404(Order, pk=order_id)
        html_content = render_to_string("api/receipt.html")

        if Receipt.objects.filter(order=order).exists():
            receipt = Receipt.objects.get(order=order)
            return FileResponse(open(receipt.pdf_file.path, "rb"), content_type="application/pdf")

        try:
            pdf_file_path = os.path.join(settings.MEDIA_ROOT, f"receipts/order_{order_id}.pdf")
            pdfkit.from_string(html_content, pdf_file_path)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        receipt = Receipt.objects.create(order=order, pdf_file=f"receipts/order_{order_id}.pdf")

        return FileResponse(open(pdf_file_path, "rb"), content_type="application/pdf")
    
# Review API
class ReviewAPIView(APIView):
    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Review complete successfully","data":serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
