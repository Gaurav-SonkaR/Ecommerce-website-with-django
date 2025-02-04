from django.db import models
from django.contrib.auth import get_user_model
from products.models import Products

User = get_user_model()

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_cart_total(self):
        cart_items = self.cartitem_set.all()
        total = sum(item.get_item_total() for item in cart_items)
        return total

    def get_cart_items_count(self):
        return self.cartitem_set.all().count()

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def get_item_total(self):
        return self.product.price * self.quantity

