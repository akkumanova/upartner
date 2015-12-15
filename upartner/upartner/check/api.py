import csv
from datetime import date

from django.http import Http404, HttpResponse

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import permission_classes

from .models import CheckFile, Check
from upartner.file.models import File
from upartner.partner.models import Partner
from upartner.core.permissions import IsStaffPermission
from upartner.core.string_utils import StringUtils
from upartner.core.choices import CheckResultChoice

@permission_classes((IsStaffPermission, ))
class CheckFileViewSet(viewsets.ViewSet):
    queryset = CheckFile.objects.all()

    def get_object(self, pk):
        try:
            return CheckFile.objects.get(pk=pk)
        except CheckFile.DoesNotExist:
            raise Http404

    def list(self, request):
        check_files = self.queryset

        result = map((lambda cf: {
            'id': cf.pk,
            'isImported': cf.is_imported,
            'dateCreated': cf.date_created,
            'dateImported': cf.date_imported

        }), list(check_files))

        return Response(result)

    def create(self, request):
        ufile = File.objects.get(id=request.data.get('key'))
        with open(ufile.get_file_path()) as file:
            try:
                dialect = csv.Sniffer().sniff(file.read(1024))
                file.seek(0, 0)
            except csv.Error:
                return HttpResponse(
                    status=status.HTTP_428_PRECONDITION_REQUIRED,
                    reason='Invalid file format (expected csv).')

            check_file = CheckFile(file=ufile,is_imported=False,date_created=date.today())
            check_file.save()

            partners = Partner.objects.all() \
                .filter(check_result__isnull=True) \
                .values('pk', 'user__first_name', 'user__last_name', 'check_result')

            reader = csv.reader(file.read().splitlines(), dialect)

            checks = list()
            for row in reader:
                num_items = len(row)

                if not num_items:
                    continue

                id = StringUtils.get_int(row[0])
                name = None if num_items == 1 else row[1]
                check_result = None if num_items == 2 else row[2]

                partner = None if id is None \
                    else next((partner for partner in partners
                                if partner['pk'] == id), None)
                result = None if check_result is None \
                    else next((r for r in CheckResultChoice.get_values()
                                if r[1].lower() == check_result.strip().lower()), None)

                check = Check(
                    check_file=check_file,
                    id_str=row[0],
                    name=name,
                    error=None,
                    result=check_result,
                    partner_id=None if partner is None else partner['pk'],
                    check_result= None if result is None else result[0]
                )

                check.validate(
                    None if partner is None else partner['user__first_name'],
                    None if partner is None else partner['user__last_name'])
                checks.append(check)

            Check.objects.bulk_create(checks)

        return HttpResponse(status=status.HTTP_201_CREATED)