from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Product, CartItem, Order, OrderItem
from .serializers import *

# --- AUTHENTICATION ---
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

# --- PRODUCTS ---
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# --- CART ---
class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product_id = self.request.data.get('product_id')
        item, created = CartItem.objects.get_or_create(
            user=self.request.user, product_id=product_id
        )
        if not created:
            item.quantity += int(self.request.data.get('quantity', 1))
            item.save()
        else:
            serializer.save(user=self.request.user)

# --- ORDERS & CHECKOUT ---
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def checkout(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user)
    
    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    total = sum(item.product.price * item.quantity for item in cart_items)
    
    # Create Order
    order = Order.objects.create(user=user, total_amount=total, status='Pending')
    
    for item in cart_items:
        OrderItem.objects.create(
            order=order, product=item.product, 
            price=item.product.price, quantity=item.quantity
        )
    
    # Clear Cart after order
    cart_items.delete()
    
    return Response({"message": "Order placed!", "order_id": order.id})