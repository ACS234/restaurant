# Generated by Django 5.1.7 on 2025-04-26 06:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='table',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.table'),
        ),
    ]
