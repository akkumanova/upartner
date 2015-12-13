from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=10)

    class Meta:
        db_table = 'nomenclatures_country'
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'