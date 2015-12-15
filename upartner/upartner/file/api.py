import uuid
import os

from django.http import Http404, HttpResponse
from django.db.models import Q

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import permission_classes

from .models import File
from upartner.core.permissions import IsStaffPermission

@permission_classes((IsStaffPermission, ))
class FileViewSet(viewsets.ViewSet):
    queryset = File.objects.all()

    def get_last_with_name(self, filename, extension):
        query = File.objects.all() \
                .filter(Q(filename=filename) & Q(extension=extension)) \
                .order_by('-order_num') \
                [:1]

        result = list(query)
        return None if not(result) else result[0]

    def get_object(self, pk):
        try:
            return File.objects.get(id=pk)
        except File.DoesNotExist:
            raise Http404

    def save_file(self, file, path):
        with open(path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

    def create(self, request):
        for _, file in request.FILES.iteritems():
            filename, extension = os.path.splitext(str(file.name))
            extension = extension.lstrip('.')

            last_file = self.get_last_with_name(filename, extension)
            order_num = 0 if last_file is None else last_file.order_num + 1

            ufile = File(
                id=uuid.uuid1(),
                filename=filename,
                extension=extension,
                order_num=order_num,
                type=file.content_type)
            ufile.save()

            self.save_file(file, ufile.get_file_path())

        return Response({'fileKey': ufile.id})

    def retrieve(self, request, pk):
        def read_in_chunks(file, chunk_size=1024):
            while True:
                data = file.read(chunk_size)
                if not data:
                    break
                yield data

        ufile = self.get_object(pk)

        response = HttpResponse(content_type=ufile.type)
        response['Content-Disposition'] = 'attachment; filename=%s' % ufile.filename

        with open(ufile.get_file_path(), 'rb+') as source:
            for chunk in read_in_chunks(source):
                response.write(chunk)

        return response