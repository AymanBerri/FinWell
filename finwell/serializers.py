from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

# Categories serializers must be named [category-type]CategorySerializer

# USER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}


# EXPENSE
class ExpenseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):
    category = ExpenseCategorySerializer()

    class Meta:
        model = Expense
        fields = '__all__'
    
    def create(self, validated_data):
        category_data = validated_data.pop('category', None)
        
        # Check if category_data exists and is not an empty dictionary
        # checking if category_data exists, is a dictionary, and is not empty
        if category_data and isinstance(category_data, dict) and category_data != {}:
            category_instance, _ = ExpenseCategory.objects.get_or_create(**category_data)
            validated_data['category'] = category_instance

        
        instance = Expense.objects.create(**validated_data)
        return instance
    
    def update(self, instance, validated_data):
        # Extract category data from validated data
        category_data = validated_data.pop('category', None)

        # Update instance fields with validated data
        instance.amount = validated_data.get('amount', instance.amount)
        instance.description = validated_data.get('description', instance.description)
        instance.date = validated_data.get('date', instance.date)

        # Update or create nested category instance
        if category_data and isinstance(category_data, dict) and category_data != {}:
            # Update or create category instance based on category data
            category_instance, _ = ExpenseCategory.objects.update_or_create(**category_data)
            instance.category = category_instance

        # Save the updated instance
        instance.save()
        
        # Return the updated instance
        return instance



# INCOME
class IncomeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeCategory
        fields = '__all__'

class IncomeSerializer(serializers.ModelSerializer):
    category = IncomeCategorySerializer()

    class Meta:
        model = Income
        fields = '__all__'
    
    def create(self, validated_data):
        category_data = validated_data.pop('category', None)
        
        # Check if category_data exists and is not an empty dictionary
        if category_data and isinstance(category_data, dict) and category_data != {}:
            category_instance, _ = IncomeCategory.objects.get_or_create(**category_data)
            validated_data['category'] = category_instance

        
        instance = Income.objects.create(**validated_data)
        return instance
    
    def update(self, instance, validated_data):
        # Extract category data from validated data
        category_data = validated_data.pop('category', None)

        # Update instance fields with validated data
        instance.amount = validated_data.get('amount', instance.amount)
        instance.description = validated_data.get('description', instance.description)
        instance.date = validated_data.get('date', instance.date)

        # Update or create nested category instance
        if category_data and isinstance(category_data, dict) and category_data != {}:
            # Update or create category instance based on category data
            category_instance, _ = IncomeCategory.objects.update_or_create(**category_data)
            instance.category = category_instance

        # Save the updated instance
        instance.save()
        
        # Return the updated instance
        return instance