from django.shortcuts import render, get_object_or_404 , redirect
from products.models import Products

def all_products(request):
    query = request.GET.get('q', '')
    category_filter = request.GET.get('category', '')
    price_min = request.GET.get('price_min', 0)
    price_max = request.GET.get('price_max', 1000000)

    products = Products.objects.all()
    # return render(request,"all_products.html",{'products':products})
    if query:
        products = products.filter(name__icontains=query)
    if category_filter:
        products = products.filter(category__name=category_filter)
    if price_min:
        products = products.filter(price__gte=price_min)
    if price_max:
        products = products.filter(price__lte=price_max)

    return render(request, 'all_products.html', {
        'products': products,
        'query': query,
        'category_filter': category_filter,
        'price_min': price_min,
        'price_max': price_max,
    })

def product_detail(request, id):
    product = Products.objects.get(id = id )
    return render(request, 'product_details.html', {'product': product})