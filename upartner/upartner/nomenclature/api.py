from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Country

class CountryList(APIView):

    def get(self, request):
        countries = Country.objects.all()

        term = self.request.query_params.get('term', None)
        if term:
            countries = countries.filter(name__icontains=term)

        offset = self.request.query_params.get('offset', 0)
        limit = self.request.query_params.get('limit', 10)

        countries = countries.order_by('name')[offset:limit]

        result = map((lambda c: {
            'nomValueId': c.id,
            'name': c.name
        }), list(countries))

        return Response(result)

class CountryDetail(APIView):
    def get_object(self, id):
        try:
            return Country.objects.get(id=id)
        except Country.DoesNotExist:
            raise Http404

    def get(self, request, id):
        country = self.get_object(id)
        result = {
            'nomValueId': country.id,
            'name': country.name

        }

        return Response(result)