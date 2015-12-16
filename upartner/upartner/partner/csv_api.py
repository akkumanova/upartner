import csv

from django.http import StreamingHttpResponse
from rest_framework import viewsets
from rest_framework.decorators import permission_classes, list_route

from upartner.utils.permissions import IsStaffPermission
from .models import Partner

class Echo(object):
    def write(self, value):
        return value

@permission_classes((IsStaffPermission, ))
class PartnerCsvViewSet(viewsets.ViewSet):
    queryset = Partner.objects.all()

    @list_route(methods=['get'])
    def export(self, request):
        partner_ids = request.GET.getlist('ids')

        partners = Partner.objects.all() \
            .filter(pk__in=partner_ids) \
            .values('pk', 'user__first_name', 'user__last_name')

        rows = ([str(p.get('pk')), '{} {}'.format(p.get('user__first_name'), p.get('user__last_name'))] for p in partners)
        pseudo_buffer = Echo()
        writer = csv.writer(pseudo_buffer)
        response = StreamingHttpResponse(
            (writer.writerow(row) for row in rows),
            content_type="text/csv"
        )
        response['Content-Disposition'] = 'attachment; filename="partners.csv"'

        return response