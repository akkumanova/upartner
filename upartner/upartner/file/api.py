from django.db import connection
from django.http import StreamingHttpResponse

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import permission_classes

from .models import File
from upartner.core.permissions import IsStaffPermission
import uuid
import base64

@permission_classes((IsStaffPermission, ))
class FileViewSet(viewsets.ViewSet):
    queryset = File.objects.all()

    def create(self, request):
        cursor = connection.cursor()

        for _, file in request.FILES.iteritems():
            file_id = uuid.uuid1()

            cursor.execute("""INSERT INTO uber_files(id, filename)
                              VALUES ('{}', N'{}');""".format(file_id, str(file.name)))

            order_num = 1
            for chunk in file.chunks():
                query = """INSERT INTO uber_file_chunks(order_num, file_id, content)
                           VALUES ({}, '{}', '{}');"""

                cursor.execute(query.format(order_num, file_id, base64.b64encode(chunk)))

                order_num += 1

        return Response({'fileKey': file_id })

    def retrieve(self, request, pk):
        cursor = connection.cursor()

        selectQuery = """SELECT content FROM uber_file_chunks
                         WHERE file_id='{}'
                         ORDER BY order_num;""".format(pk)
        cursor.execute(selectQuery)

        file = File.objects.get(id=pk)
        response = StreamingHttpResponse((line for line in cursor.fetchall()))
        response['Content-Disposition'] = "attachment; filename={0}".format(file.filename)
        return response