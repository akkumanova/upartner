from django.db import models

class File(models.Model):
    id = models.UUIDField(primary_key=True)
    filename = models.CharField(max_length=50)

    class Meta:
        db_table = 'uber_files'
        verbose_name = 'Uber file'
        verbose_name_plural = 'Uber files'