from django.contrib import admin
from products.models import Products  

class ProductAdmins(admin.ModelAdmin):
    list_display = ('name','description', 'category', 'price', 'stock','image')  # Fields to display in the admin list view
    search_fields = ('name', 'category')  # Fields to search by
    list_filter = ('category',)  # Filters for easier categorization
    ordering = ('name',)  # Default ordering in the admin list view

admin.site.register(Products, ProductAdmins)
