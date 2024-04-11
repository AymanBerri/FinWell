from django.contrib import admin
from .models import *

# Register your models here.

# EXPENSE
@admin.register(ExpenseCategory)
class ExpenseCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    search_fields = ('name',)

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'category', 'date', 'created', 'updated')
    list_filter = ('user', 'category', 'date')
    search_fields = ('user__username', 'amount', 'category__name', 'description')



# INCOME
@admin.register(IncomeCategory)
class IncomeCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    search_fields = ('name',)

@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'category', 'date', 'created', 'updated')
    list_filter = ('user', 'category', 'date')
    search_fields = ('user__username', 'amount', 'category__name', 'description')
