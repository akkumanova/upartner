from django.db import models
from django.conf import settings

from upartner.nomenclature.models import Country

class Partner(models.Model):
    id = models.AutoField(primary_key=True)

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        db_column='user_id',
        verbose_name='partner',
        related_name='partner')

    country = models.OneToOneField(Country, verbose_name="country")

    CLEAN = 'cl'
    DOCS_DISCREPANCY = 'dd'
    FAKE_DOCS = 'fd'
    CHECK_RESULT_CHOICES = (
        (CLEAN           , 'Clean'              ),
        (DOCS_DISCREPANCY, 'Discrepancy in docs'),
        (FAKE_DOCS, 'Fake documents'),
    )
    check_result = models.CharField(
        max_length=2,
        choices=CHECK_RESULT_CHOICES,
        default=FAKE_DOCS)

    class Meta:
        db_table = 'uber_partners'
        verbose_name = 'Uber partner'
        verbose_name_plural = 'Uber partners'
