import base64
import qrcode
import io
import os
from django.conf import settings
from reportlab.pdfgen import canvas


def generate_qr_code(data, size=10, border=0):
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=size, border=border)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image()
    return img


def generate_qr(url_text):
    generated_code = generate_qr_code(data=url_text, size=10, border=1)
    bio = io.BytesIO()
    img_save = generated_code.save(bio)
    png_qr = bio.getvalue()
    base64qr = base64.b64encode(png_qr)
    img_name = base64qr.decode("utf-8")
    context_dict = dict()
    context_dict['file_type'] = "png"
    context_dict['image_base64'] = img_name
    return context_dict



def generate_receipt_pdf(order):
    path = os.path.join(settings.MEDIA_ROOT, f"receipts/order_{order.id}.pdf")
    os.makedirs(os.path.dirname(path), exist_ok=True)

    c = canvas.Canvas(path)
    c.setFont("Helvetica", 14)
    c.drawString(100, 800, f"Receipt - Order #{order.id}")
    c.drawString(100, 780, f"Customer: {order.customer_name or order.user.username}")
    c.drawString(100, 760, f"Table: {order.table.table_number if order.table else 'N/A'}")
    c.drawString(100, 740, "Items:")

    y = 720
    total = 0
    for item in order.items.all():
        line = f"{item.food.name} x {item.quantity} - ₹{item.total_price}"
        c.drawString(100, y, line)
        total += item.total_price
        y -= 20

    c.drawString(100, y - 10, f"Total: ₹{total}")
    c.drawString(100, y - 40, "Thank you for dining with us! Visit Again ❤️")
    c.save()
