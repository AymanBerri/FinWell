"""
URL configuration for capstone project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from django.conf.urls import url
from finwell.views import *


urlpatterns = [


    # API Endpoints
    path('api/create_user/', CreateUserView.as_view(), name='create_user'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),    
    path('user-info/', UserProfileView.as_view(), name='user-info'),
    path('api/categories/<str:category_type>/', CategoryListView.as_view(), name='category-list'),

    path('dashboard/', DashboardView.as_view(), name='dashboard'),

    
    path('api/income/', IncomeAPIView.as_view(), name='income-api'),
    path('api/income/<int:pk>/', IncomeAPIView.as_view(), name='income-update-api'),  # For updating an existing income

    path('api/expense/', ExpenseAPIView.as_view(), name='expense-api'),
    path('api/expense/<int:pk>/', ExpenseAPIView.as_view(), name='expense-update-api'),  # For updating an existing expense

]
