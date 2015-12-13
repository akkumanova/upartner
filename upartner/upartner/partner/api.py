from django.http import Http404

from rest_framework import status
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

    def get(self, request, id):
        partner = self.get_object(id)

        return Response(partner.get_data())

    def put(self, request, id):
        partner = self.get_object(id)

        partner.set_data(request.data)
        partner.user.save()
        partner.save()

        return Response(status=status.HTTP_200_OK)
