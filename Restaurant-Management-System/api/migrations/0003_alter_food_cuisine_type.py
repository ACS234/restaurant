# Generated by Django 5.1.7 on 2025-04-12 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='cuisine_type',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
