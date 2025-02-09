# Generated by Django 5.1.4 on 2025-01-11 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0002_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='razorpay_order_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='cart',
            name='razorpay_payment_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='cart',
            name='razorpay_payment_signature',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.DeleteModel(
            name='Payment',
        ),
    ]
