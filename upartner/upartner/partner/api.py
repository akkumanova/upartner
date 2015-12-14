from django.http import Http404
from django.core.exceptions import SuspiciousOperation

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import detail_route, list_route, permission_classes

from .models import Partner
from .threads import EmailThread
from upartner.core.permissions import IsStaffPermission

@permission_classes((IsStaffPermission, ))
class PartnerViewSet(viewsets.ViewSet):
    queryset = Partner.objects.all()

    def get_object(self, pk):
        try:
            return Partner.objects.get(pk=pk)
        except Partner.DoesNotExist:
            raise Http404

    def list(self, request):
        partners = Partner.objects.all()

        first_name = self.request.query_params.get('firstName', None)
        last_name = self.request.query_params.get('lastName', None)
        if first_name is not None:
            partners = partners.filter(user__first_name__icontains=first_name)

        if last_name is not None:
            partners = partners.filter(user__last_name__icontains=last_name)

        result = map((lambda u: {
            'id': u.pk,
            'username': u.user.username,
            'firstName': u.user.first_name,
            'lastName': u.user.last_name,
            'email': u.user.email,
            'country': u.country.name,
            'isActive': u.user.is_active,
            'checkResult': u.check_result

        }), list(partners))

        return Response(result)

    def create(self, request):
        partner = Partner.create(
            username=request.data.get('username'),
            first_name=request.data.get('firstName'),
            last_name=request.data.get('lastName'),
            email=request.data.get('email'),
            country_id=request.data.get('countryId'))

        partner.save()

        return Response({'id': partner.pk}, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        partner = self.get_object(pk)

        data = {
            'id': partner.pk,
            'username': partner.user.username,
            'firstName': partner.user.first_name,
            'lastName': partner.user.last_name,
            'email': partner.user.email,
            'isActive': partner.user.is_active,
            'countryId': partner.country_id,
            'checkResult': partner.check_result
        }
        return Response(data)

    def update(self, request, pk=None):
        partner = self.get_object(pk)

        partner.set_data(
            request.data.get('firstName'),
            request.data.get('lastName'),
            request.data.get('email'),
            request.data.get('countryId'))

        return Response(status=status.HTTP_204_NO_CONTENT)

    @detail_route(methods=['post'])
    def activate(self, request, pk=None, format=None, **kwargs):
        partner = self.get_object(pk)
        is_first_activation = not partner.is_activated
        password = partner.password

        partner.activate()

        if is_first_activation:
            content = ('<h1>Congratulations, you are now an official Uber partner</h1>'
                '<p>Your account is registered with username %s and password %s'
                '(for security reasons, please be sure to change this password as soon as posible).</p>'
                '<p>The Uber team</p>') % (partner.user.username, password)

            mail_thread = EmailThread(
                partner.user.email,
                'Uber partner',
                content)

            mail_thread.start()
            mail_thread.run()

        return Response(status=status.HTTP_204_NO_CONTENT)

class PartnerAccountViewSet(viewsets.ViewSet):
    queryset = Partner.objects.all()

    def get_object(self, pk):
        try:
            partner = Partner.objects.get(user__pk=pk)

            return partner
        except Partner.DoesNotExist:
            raise SuspiciousOperation()

    @list_route(methods=['get'])
    def data(self, request):
        partner = self.get_object(request.user.pk)

        data = {
            'id': partner.pk,
            'username': partner.user.username,
            'firstName': partner.user.first_name,
            'lastName': partner.user.last_name,
            'email': partner.user.email,
            'isActive': partner.user.is_active,
            'countryId': partner.country_id,
            'checkResult': partner.check_result
        }
        return Response(data)

    @list_route(methods=['put'])
    def updatedata(self, request):
        partner = self.get_object(request.user.pk)

        partner.set_data(
            request.data.get('firstName'),
            request.data.get('lastName'),
            request.data.get('email'),
            request.data.get('countryId'))

        return Response(status=status.HTTP_204_NO_CONTENT)