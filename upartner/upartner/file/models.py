import os

from django.conf import settings
from django.db import models

class File(models.Model):
    id = models.UUIDField(primary_key=True)
    filename = models.CharField(max_length=50)
    extension = models.CharField(max_length=20)
    order_num = models.IntegerField()
    type = models.CharField(max_length=100)

    def get_file_path(self):
        name = '{}_{}.{}'.format(self.filename, self.order_num, self.extension)
        return os.path.join(settings.FILE_DESTINATION, name)

    class Meta:
        db_table = 'uber_files'
        verbose_name = 'Uber file'
        verbose_name_plural = 'Uber files'