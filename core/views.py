from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from products.models import Products

User = get_user_model()


def home(request):
    products = Products.objects.all()
    product_categories = Products.objects.values_list('category', flat=True).distinct()
    product_info = {
        'products': products,
        'product_categories': product_categories
    }
    return render(request, "index.html", product_info)


def login_page(request):
    if request.method == "POST":
        data = request.POST
        email = data.get('email')
        password = data.get('password')

        if not User.objects.filter(email = email).exists():
            messages.error(request,'Invalid User')
            return redirect('/login/')

        user = authenticate(email = email , password = password)

        if user is None:
            messages.error(request , 'Invalid Password')
            return redirect('/login/')
        else :
            login(request,user)
            return redirect('/')

    return render(request , "login.html")

def logout_page(request):
    logout(request)
    return redirect('/login/')


def register_page(request):
    data = {}
    try:
        # Suggested code may be subject to a license. Learn more: ~LicenseLog:1856409913.
        if request.method == "POST":
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            email = request.POST.get('email')
            phone = request.POST.get('phone')
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')
           
            data={
                'first_name' : first_name,
                'last_name': last_name,
                'email' : email,
                'phone' : phone,
            }


            
            user = User.objects.filter(email = email)

            if user.exists():
                messages.info(request , 'Email already exists try with another Email')
                return redirect('/register/')
            elif password != confirm_password :
                messages.info(request,'Both passwords are not same.')
                return render(request,"register.html",data)
            elif len(password)>8:
                messages.info(request,'Password must be contain atleast 8 character')
                return render(request,"register.html",data)
            else:
                user = User.objects.create(
                    first_name = first_name,
                    last_name = last_name,
                    email = email,
                    phone = phone,
                )  # for regular save of data

                user.set_password(password) # to save password in encrypted form
                user.save()

                messages.info(request, 'Account Created Successfully')
                return redirect('/register/')

        return render(request , "register.html")
    except:
        return render(request,"register.html",data)

def about_page(request):
    return render(request,'about.html')

def contact_page(request):
    if request.method == 'POST':
        # Get data from the form
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        # Validate the data (simple example)
        if not all([name, email, subject, message]):
            messages.error(request, "All fields are required.")
            return render(request, 'contact.html')

        # Send an email (optional, can be configured to store in DB instead)
        try:
            send_mail(
                subject=f"Contact Form: {subject}",
                message=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=False,
            )
            messages.success(request, "Your message has been sent successfully!")
        except Exception as e:
            messages.error(request, "An error occurred. Please try again later.")
            print(e)

        return render(request, 'contact.html')

    # For GET requests, just render the contact page

    return render(request,'contact.html')