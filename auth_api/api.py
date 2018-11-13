from django.contrib.auth import authenticate, login, logout
from rest_framework import status, views
from django.views.decorators.csrf import csrf_protect #login view will be csrf protected
from django.utils.decorators import method_decorator #to decorate a method instead of a class
from rest_framework.response import Response
from .serializers import UserSerializer


class LoginView(views.APIView):

    @method_decorator(csrf_protect)
    def post(self, request):
        user = authenticate(
            username = request.data.get("username"),
            password = request.data.get("password")
        )

        if user is None or not user.is_active:
            return  Response({
                'status': 'Unauthorized',
                'message': 'Username or Password is incorerect'
            }, status = status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        return Response(UserSerializer(user).data)  # sending user object as json

class LogoutView(views.APIView):

    def get(self, request):
        logout(request)
        return  Response({}, status=status.HTTP_204_NO_CONTENT)