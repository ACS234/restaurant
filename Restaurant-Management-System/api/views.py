import qrcode
import stripe
import io
from io import BytesIO
from django.core.files.base import ContentFile
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from django.shortcuts import get_object_or_404, render
from django.http import FileResponse
from rest_framework.response import Response
from rest_framework import generics,filters,status
from .models import *
from .serializers import *
from django.template.loader import render_to_string
import pdfkit
from django.utils import timezone
import os
from django.conf import settings
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from .utils import generate_qr_code

stripe.api_key = settings.STRIPE_SECRET_KEY
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.db import transaction


class FoodFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="contains")
    category = filters.CharFilter(field_name="category", lookup_expr="contains")
    is_vegetarian = filters.BooleanFilter(field_name="is_vegetarian")

    class Meta:
        model = Food
        fields = ['name', 'category', 'is_vegetarian']

# Search API for Food And Menu
class SearchFoodAPIView(generics.ListAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = FoodFilter


class GetCategory(APIView):
    permission_classes=[IsAuthenticatedOrReadOnly]
    def get(self, request):
        # food_categories = Food.objects.values_list('category', flat=True).distinct()
        # menu_categories = Menu.objects.values_list('category', flat=True).distinct()
        # all_categories = list(set(food_categories) | set(menu_categories))
        # return Response(all_categories)
        food_categories = Food.objects.values_list('category', flat=True).distinct()
        food_categories = [f"Food: {category}" for category in food_categories]
        menu_categories = Menu.objects.values_list('category', flat=True).distinct()
        menu_categories = [f"Menu: {category}" for category in menu_categories]
        all_categories = list(set(food_categories) | set(menu_categories))
        return Response(all_categories)

        
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


class GenerateQRCodeView(APIView):

    def post(self, request):
        table_id = request.data.get("table_id")
        if not table_id:
            return Response({"error": "Table ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            restaurant = Restaurant.objects.first()

            if not restaurant:
                return Response({"error": "Default restaurant not found."}, status=status.HTTP_404_NOT_FOUND)

            restaurant_id = restaurant.id
            table = Table.objects.get(id=table_id, restaurant_id=restaurant_id)
        except Table.DoesNotExist:
            return Response({"error": "Table not found in the default restaurant."}, status=status.HTTP_404_NOT_FOUND)

        existing_qr_code = QRCode.objects.filter(
            restaurant=restaurant,
            type="table",
            details__contains={"table_id": table.id}  
        ).first()

        if existing_qr_code:
            return Response(
            {"error": f"QR code for table {table.table_number} already exists."},
            status=status.HTTP_400_BAD_REQUEST)
        
        qr_data_url = f"https://yourdomain.com/qrcode/?table_number="
        img = generate_qr_code(qr_data_url)
        bio = io.BytesIO()
        img.save(bio, format="PNG")
        qr_image_content = ContentFile(bio.getvalue(), name=f"table_{table.id}_qr.png")

        qr_code_obj = QRCode.objects.create(
            restaurant=restaurant,
            type="table",
            qr_code=qr_image_content,
            details={
                "table_number": table.table_number,
            }
        )

        serialized = QRCodeSerializer(qr_code_obj, context={'request': request})
        return Response({"qr_code": serialized.data}, status=status.HTTP_201_CREATED)


    def get(self, request):
        restaurant = Restaurant.objects.first() 
        if not restaurant:
            return Response({"error": "Restaurant not found."}, status=status.HTTP_404_NOT_FOUND)

        qr_codes = QRCode.objects.filter(restaurant=restaurant, type="table")

        serialized_qr_codes = QRCodeSerializer(qr_codes, many=True, context={'request': request})

        return Response(serialized_qr_codes.data, status=status.HTTP_200_OK)

class QRCodeByTableNumberView(APIView):
    def get(self, request):
        table_number = request.query_params.get('table_number')
        if not table_number:
            return Response({'error': 'table_number is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            qr_code = QRCode.objects.get(details__table_number=table_number)
        except QRCode.DoesNotExist:
            return Response({'error': 'QR Code not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = QRCodeSerializer(qr_code, context={'request': request})
        return Response(serializer.data)

# for qr code
class MenusAPIView(APIView):
    def get(self, request, restaurant_id, table_id):
        restaurant = Restaurant.objects.get(id=restaurant_id)
        table = Table.objects.get(id=table_id, restaurant=restaurant)

        menu_items = restaurant.menus.all()

        serializer = MenuSerializer(menu_items, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

#  Food API
class FoodAPIView(APIView):
    def get(self, request):
        foods = Food.objects.all()[:10]
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
    permission_classes=[IsAuthenticatedOrReadOnly]
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
            unbooked_tables = Table.objects.filter(reservations__isnull=True).select_related('restaurant')
            serializer = TableSerializer(unbooked_tables, many=True)
            return Response({"message": "Unbooked tables", "data": serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CartItemCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user).select_related('food')
        serializer = CartItemSerializer(cart_items, many=True)
        return Response({"data": serializer.data, "total": cart_items.count()}, status=status.HTTP_200_OK)
    
    def post(self,request):
        try:
            food_id = request.data.get('food')
            quantity = request.data.get('quantity', 1)

            food = get_object_or_404(Food, id=food_id)

            cart_item = CartItem.objects.create(
                food=food,
                quantity=quantity,
                user=request.user
            )
            return Response(CartItemSerializer(cart_item).data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


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
    permission_classes = [IsAuthenticatedOrReadOnly]

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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            now = timezone.localtime()
            today = now.date()

            for reservation in Reservation.objects.filter(status='booked'):
                if reservation.is_expired:
                    reservation.table.is_available = True
                    reservation.table.save()
                    reservation.delete()  

            active_reservations = Reservation.objects.filter(
                reservation_date__gte=today,
                status='booked'
            ).order_by('reservation_date', 'reservation_time')

            inactive_reservations = Reservation.objects.filter(
                status='unbooked'
            ).order_by('reservation_date', 'reservation_time')

            inactive_reservations.delete()

            return Response({
                "active_reservations": ReservationSerializer(active_reservations, many=True).data,
                "inactive_reservations": ReservationSerializer(inactive_reservations, many=True).data,
                "message": "Expired reservations deleted and tables freed."
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            table = serializer.validated_data['table']
            date = serializer.validated_data['reservation_date']
            time = serializer.validated_data['reservation_time']
            end_time = serializer.validated_data['reservation_end_time']

            is_booked = Reservation.objects.filter(
                table=table,
                reservation_date=date,
                reservation_time=time,
                reservation_end_time=end_time,
                status='booked'
            ).exists()

            if is_booked:
                return Response(
                    {'error': 'This table is already booked at the selected date and time.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            table.is_available = False
            table.save()

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

        existing_order = Order.objects.filter(user=user, status='Paid').first()
        if existing_order:
            cart_items.delete()
            return Response({'error': 'This order has already been paid.'}, status=status.HTTP_400_BAD_REQUEST)

        order_data = {
            'user': user,
            'total_price': total_price,
        }
        order = Order.objects.create(**order_data)
        
        for item in cart_items:
            order.items.create(food=item.food, quantity=item.quantity)
    
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
    permission_classes=[IsAuthenticatedOrReadOnly]

    def get(self,request):
        payments=Payment.objects.filter(user=request.user).all()
        serializer=PaymentSerializer(payments,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        items = data.get('order', [])
        amount = data.get('amount')
        payment_method = data.get('payment_method')
        restaurant_id = data.get('restaurant_id')

        if not items or not amount or not payment_method or not restaurant_id or not request.user:
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
            with transaction.atomic():
                order = Order.objects.create(
                    restaurant=restaurant,
                    customer_name=request.user,
                    status='Completed',  # Or use 'Pending' if payment happens later
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
                    is_paid=True
                )

                # Clear user's cart
                CartItem.objects.filter(user=request.user).delete()

                return Response(
                    {
                        "success": True,
                        "order_id": order.id,
                        "payment_id": payment.id,
                        "is_paid": True,
                        "message": "Order and payment processed successfully."
                    },
                    status=status.HTTP_201_CREATED
                )

        except Exception as e:
            return Response(
                {"success": False, "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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
