import csv
from datetime import date

from django.db import connection
from django.http import Http404, HttpResponse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import detail_route, permission_classes
from rest_framework.response import Response

from upartner.file.models import File
from upartner.partner.models import Partner
from upartner.utils.choices import CheckResultChoice
from upartner.utils.permissions import IsStaffPermission
from upartner.utils.string_utils import StringUtils
from .models import CheckFile, Check


@permission_classes((IsStaffPermission, ))
class CheckFileViewSet(viewsets.ViewSet):
    queryset = CheckFile.objects.all()

    def get_object(self, pk):
        try:
            return CheckFile.objects.get(pk=pk)
        except CheckFile.DoesNotExist:
            raise Http404

    def list(self, request):
        check_files = CheckFile.objects.all() \
            .values('pk', 'is_imported', 'date_created', 'date_imported')

        result = map((lambda cf: {
            'id': cf['pk'],
            'isImported': cf['is_imported'],
            'dateCreated': cf['date_created'],
            'dateImported': cf['date_imported']

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

        return Response({'id': check_file.pk}, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk):
        check_file = self.get_object(pk)

        data = {
            'id': check_file.pk,
            'isImported': check_file.is_imported,
            'dateCreated': check_file.date_created,
            'dateImported': check_file.date_imported
        }
        return Response(data)

    @detail_route(methods=['get'])
    def items(self, request, pk):
        checks = Check.objects.all() \
            .filter(check_file__pk=pk) \
            .values('id_str', 'name', 'result', 'is_valid', 'error')

        result = map((lambda cf: {
            'id': cf['id_str'],
            'name': cf['name'],
            'result': cf['result'],
            'isValid': cf['is_valid'],
            'error': cf['error']

        }), list(checks))

        return Response(result)

    @detail_route(methods=['post'])
    def importdata(self, request, pk):
        # writing raw query because bulk_insert does not support joins
        cursor = connection.cursor()

        check_file = self.get_object(pk)
        check_file.mark_imported()
        check_file.save()

        cursor.execute("""UPDATE uber_partners AS ub
                          SET check_result = uc.check_result
                          FROM uber_checks as uc
                          WHERE ub.id = uc.partner_id AND uc.is_valid AND ub.check_result IS NULL AND uc.check_file_id  = %s""", [pk])

        return Response(status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):
        check_file = self.get_object(pk)

        if (check_file.is_imported):
            return HttpResponse(
                status=status.HTTP_428_PRECONDITION_REQUIRED,
                reason="Cannot delete imported file.")

        check_file.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)