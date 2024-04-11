# script genrration
# from faker import Faker
from datetime import datetime, timedelta
import random



from rest_framework.views import APIView
from .serializers import *
from rest_framework import status
from django.contrib.auth import logout
from django.contrib.auth.hashers import check_password, make_password

from django.test import Client
import json

# from .models import *
from .models import Income
from .serializers import *
from .utils import get_user_token

from rest_framework.response import Response

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from django.http import Http404


from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


from django.contrib.auth import login

# fake = Faker()



# Create your views here.

from django.db.models import Sum


from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Income, Expense
from .serializers import IncomeSerializer, ExpenseSerializer

class DashboardView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        year = request.query_params.get('year')


        # Filter records by year if provided
        if year:
            if year == '-1':
                # Return all records
                incomes = Income.objects.filter(user=request.user)
                expenses = Expense.objects.filter(user=request.user)
            else:
                try:
                    year = int(year)
                except ValueError:
                    raise Http404("Invalid year format. Please provide a valid year or '-1' for all data.")

                incomes = Income.objects.filter(date__year=year, user=request.user)
                expenses = Expense.objects.filter(date__year=year, user=request.user)
        else:
            raise Http404("Year parameter is required. Please provide a valid year or '-1' for all data.")

        # Accumulate income amounts by category
        income_by_category = {}
        for income in incomes:
            category_name = income.category.name
            income_by_category[category_name] = income_by_category.get(category_name, 0) + income.amount

        # Accumulate expense amounts by category
        expense_by_category = {}
        for expense in expenses:
            category_name = expense.category.name
            expense_by_category[category_name] = expense_by_category.get(category_name, 0) + expense.amount

        # Calculate total income and expense
        total_income = sum(income_by_category.values())
        total_expense = sum(expense_by_category.values())

        # Combine income and expense dictionaries into one
        amount_by_category = {
            'income': income_by_category,
            'expense': expense_by_category
        }

        # Serialize income and expense transactions
        income_serializer = IncomeSerializer(incomes, many=True)
        expense_serializer = ExpenseSerializer(expenses, many=True)

        return Response({
            'total_income': total_income,
            'total_expense': total_expense,
            'amount_by_category': amount_by_category,
            'incomes': income_serializer.data,
            'expenses': expense_serializer.data
        })


class CategoryListView(generics.ListAPIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        category_type = self.kwargs['category_type'].title()
        serializer_class_name = f"{category_type}CategorySerializer"
        
        # Attempt to retrieve the serializer class from the module directly
        try:
            serializer_class = getattr(__import__(__package__ + '.serializers', fromlist=[serializer_class_name]), serializer_class_name)
        except AttributeError:
            raise AttributeError(f"{serializer_class_name} not found.\nCategory serializers must be named '[category-type]CategorySerializer'")

        return serializer_class

    def get_queryset(self):
        category_type = self.kwargs['category_type'].title()
        if category_type == 'Income':
            return IncomeCategory.objects.all()
        
        if category_type == 'Expense':
            return ExpenseCategory.objects.all()

        # Handle invalid category types here
        return None

class ExpenseAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.data)
        
        expenses = Expense.objects.filter(user=request.user).order_by('-date')
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("RAN POST (ADD) EXPENSE FUNCTION")
        # expenseData = {
        #     "amount": null,
        #     "category": {
        #         "name": null
        #     },
        #     "description": null,
        #     "date": null
        # }
        # print(request.data)

        request.data['user'] = request.user.id
        # serializer = IncomeSerializer(data=request.data)
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Assign the logged-in user to the income
            print("EXPENSE ADDED")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        # placing the user in the payload.
        request.data['user'] = request.user.id

        print(request.data)
        try:
            expense = Expense.objects.get(pk=pk, user=request.user)
        except Expense.DoesNotExist:
            return Response({'error': 'Expense not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            expense = Expense.objects.get(pk=pk, user=request.user)
            expense.delete()
            return Response({'message': 'Expense deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Expense.DoesNotExist:
            return Response({'error': 'Expense not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class IncomeAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    # authentication_classes = []
    # permission_classes = []

    def get(self, request):
        print(request.data)
        
        incomes = Income.objects.filter(user=request.user).order_by('-date')
        serializer = IncomeSerializer(incomes, many=True)
        return Response(serializer.data)

    def post(self, request):
        # incomeData = {
        #     "amount": null,
        #     "category": {
        #         "name": null
        #     },
        #     "description": null,
        #     "date": null
        # }
        # print(request.data)

        request.data['user'] = request.user.id
        # serializer = IncomeSerializer(data=request.data)
        serializer = IncomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Assign the logged-in user to the income
            print("INCOME ADDED")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        # placing the user in the payload.
        request.data['user'] = request.user.id

        print(request.data)
        try:
            income = Income.objects.get(pk=pk, user=request.user)
        except Income.DoesNotExist:
            return Response({'error': 'Income not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = IncomeSerializer(income, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            income = Income.objects.get(pk=pk, user=request.user)
            income.delete()
            return Response({'message': 'Income deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Income.DoesNotExist:
            return Response({'error': 'Income not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class CreateUserView(APIView):
    authentication_classes = []  # No authentication for this view
    permission_classes = []  # No permissions required for this view

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Access validated data through serializer.validated_data
            user = User.objects.create_user(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        print("[LOGIN] Request payload:", request.data)
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            # Retrieve the user based on the email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # User does not exist
            print("User not found for email:", email) # REMOVE FOR SECURITY
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Check the password
        if user.check_password(password):
            # Password is correct, log the user in
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id}, status=status.HTTP_200_OK)
        else:
            # Incorrect password 
            print("Incorrect password for email:", email) # REMOVE FOR SECURITY
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Assuming you're using the TokenAuthentication class
        if request.user.is_authenticated:
            request.user.auth_token.delete()

        return Response({'detail': 'Logout successful'}, status=200)

class UserProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_profile = request.user

        data = {
            'username': user_profile.username,
            'email': user_profile.email,
            # Add more fields as needed
        }
        return Response(data)
    
    def put(self, request):
        user = request.user
        data = request.data

        # Check if the field parameter is provided
        field = data.get('field')
        if not field:
            return Response({'error': 'Field parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the respective field based on the provided data
        if field == 'username':
            # Check if new username is provided in request data
            new_username = data.get('value')
            if not new_username:
                return Response({'error': 'New username is required.'}, status=status.HTTP_400_BAD_REQUEST)
            user.username = new_username
        elif field == 'email':
            # Check if new email is provided in request data
            new_email = data.get('value')
            if not new_email:
                return Response({'error': 'New email is required.'}, status=status.HTTP_400_BAD_REQUEST)
            user.email = new_email
        elif field == 'password':
            # Check if old and new passwords are provided in request data
            old_password = data.get('currentPassword')
            new_password = data.get('newPassword')
            confirm_new_password = data.get('confirmNewPassword')
            if not old_password or not new_password or not confirm_new_password:
                return Response({'error': 'Current password, new password, and confirm new password are required.'}, status=status.HTTP_400_BAD_REQUEST)
            # Verify current password
            if not user.check_password(old_password):
                return Response({'error': 'Invalid current password.'}, status=status.HTTP_400_BAD_REQUEST)
            # Check if new password and confirm new password match
            if new_password != confirm_new_password:
                return Response({'error': 'New password and confirm new password do not match.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)

        # Save the updated user
        user.save()

        # Return success response
        return Response({'message': f'{field.capitalize()} updated successfully.'}, status=status.HTTP_200_OK)
