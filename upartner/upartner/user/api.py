from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import list_route, detail_route

class UserViewSet(viewsets.ViewSet):
    queryset = User.objects.all()

    @list_route(methods=['get'])
    def current(self, request, format=None, **kwargs):
        result = {
            'username': request.user.username,
            'firstName': request.user.first_name,
            'lastName': request.user.last_name
        }

        return Response(result)

    @list_route(methods=['post'])
    def logout(self, request, format=None, **kwargs):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @list_route(methods=['post'])
    def checkpassword(self, request, format=None, **kwargs):
        is_valid = request.user.check_password(request.data.get('password'))
        return Response({'valid': is_valid})

    @list_route(methods=['post'])
    def changepassword(self, request, format=None, **kwargs):
        curr_password = request.data.get('oldPassword')
        new_password = request.data.get('newPassword')

        if (not (request.user.check_password(curr_password))) or len(new_password) < 8:
            raise ValidationError(
                'Invalid password.',
                code='invalid')

        request.user.set_password(new_password)
        request.user.save()

        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @list_route(methods=['get'])
    def username_unique(self, request):
        users = User.objects.all()

        username = request.query_params.get('username')
        users = users.filter(username=username)

        uid = request.query_params.get('id', None)
        if uid is not None:
            users = users.exclude(pk=id)

        return Response({'valid': users.count() == 0})