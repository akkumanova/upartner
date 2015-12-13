from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Partner

class PartnerList(APIView):
    """
    List all partners, or create a new partner.
    """
    def get(self, request):
        partners = Partner.objects.all();

        first_name = self.request.query_params.get('firstName', None)
        last_name = self.request.query_params.get('lastName', None)
        if first_name is not None:
            partners = partners.filter(user__first_name__icontains=first_name)

        if last_name is not None:
            partners = partners.filter(user__last_name__icontains=last_name)

        result = map((lambda u: {
            'id': u.id,
            'username': u.user.username,
            'firstName': u.user.first_name,
            'lastName': u.user.last_name,
            'email': u.user.email,
            'country': u.country.name,
            'isActive': u.user.is_active,
            'checkResult': u.check_result

        }), list(partners))

        return Response(result)


class PartnerDetail(APIView):
    """
    Retrieve, update or delete partners.
    """
    def get_object(self, pk):
        try:
            return Partner.objects.get(id=pk)
        except Partner.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        partner = self.get_object(pk)
        result = {
            'id': partner.id,
            'userId': partner.user.id,
            'username': partner.user.username,
            'first_name': partner.user.first_name,
            'last_name': partner.user.last_name,
            'email': partner.user.email,
            'is_staff': partner.user.is_staff,
            'is_active': partner.user.is_active,
            'country': partner.country.name,
            'check_result': partner.check_result

        }

        return Response(result)