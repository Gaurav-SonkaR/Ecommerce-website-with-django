from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Cart, CartItem, Products
import razorpay
from django.conf import settings

@login_required(login_url='/login/')
def add_to_cart(request, product_id):
    product = get_object_or_404(Products, id=product_id)
    
    # Get or create cart for user
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    # Get quantity from form
    quantity = int(request.POST.get('quantity', 1))
    
    # Validate quantity against stock
    if quantity > product.stock:
        return JsonResponse({
            'status': 'error',
            'message': 'Requested quantity exceeds available stock'
        }, status=400)
    
    # Check if product already in cart
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        defaults={'quantity': quantity}
    )
    
    # If product was already in cart, update quantity
    if not created:
        cart_item.quantity += quantity
        if cart_item.quantity > product.stock:
            return JsonResponse({
                'status': 'error',
                'message': 'Total quantity would exceed available stock'
            }, status=400)
        cart_item.save()
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'status': 'success',
            'message': 'Product added to cart',
            'cart_count': cart.get_cart_items_count(),
            'cart_total': cart.get_cart_total()
        })
    
    return redirect('cart_view')

@login_required(login_url='/login/')
def cart_view(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    context = {
        'cart': cart,
        'cart_items': cart.cartitem_set.all().select_related('product')
    }
    return render(request, 'cart.html', context)

@login_required(login_url='/login/')
def update_cart_item(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity', 0))
        if quantity > 0 and quantity <= cart_item.product.stock:
            cart_item.quantity = quantity
            cart_item.save()
        elif quantity == 0:
            cart_item.delete()
    
    return redirect('cart_view')

@login_required(login_url='/login/')
def remove_from_cart(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    cart_item.delete()
    return redirect('cart_view')

@login_required(login_url='/login/')
def checkout_view(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.cartitem_set.all().select_related('product')
    
    if request.method == 'POST':
        # Create Razorpay client
        client = razorpay.Client(auth=(settings.RAZORPAY_API_KEY, settings.RAZORPAY_API_SECRET))
        
        # Create order
        order_amount = int(cart.get_cart_total() * 100)  # Convert to paise
        order_currency = 'INR'
        order_receipt = f'order_rcptid_{request.user.id}'
        notes = {'Shipping address': 'Bommanahalli, Bangalore'}  # Optional
        
        order = client.order.create({
            'amount': order_amount,
            'currency': order_currency,
            'receipt': order_receipt,
            'notes': notes
        })
        
        context = {
            'cart': cart,
            'cart_items': cart_items,
            'cart_total': cart.get_cart_total(),
            'order_id': order['id'],
            'razorpay_key_id': settings.RAZORPAY_API_KEY,
            'order_amount': order_amount,
            'order_currency': order_currency
        }
        return render(request, 'checkout.html', context)
    
    context = {
        'cart': cart,
        'cart_items': cart_items,
        'cart_total': cart.get_cart_total()
    }
    return render(request, 'checkout.html', context)

@login_required(login_url='/login/')
def success(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart.cartitem_set.all().delete()
    return render(request, 'success.html')