from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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

    def post(self, request):
        partner = Partner.create(
            username=request.data.get('username'),
            first_name=request.data.get('firstName'),
            last_name=request.data.get('lastName'),
            email=request.data.get('email'),
            country_id=request.data.get('countryId'))

        partner.save()

        return Response({'id': partner.pk}, status=status.HTTP_201_CREATED)


class PartnerDetail(APIView):
    """
    Retrieve, update or delete partners.
    """
    def get_object(self, pk):
        try:
            return Partner.objects.get(pk=pk)
        except Partner.DoesNotExist:
            raise Http404

    def get(self, request, id):
        partner = self.get_object(id)

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

    def put(self, request, id):
        partner = self.get_object(id)

        partner.set_data(
            request.data.get('firstName'),
            request.data.get('lastName'),
            request.data.get('email'),
            request.data.get('countryId'))

        return Response(status=status.HTTP_204_NO_CONTENT)

