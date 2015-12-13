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

    def get_data(self):
        return {
            'id': self.id,
            'userId': self.user.id,
            'username': self.user.username,
            'firstName': self.user.first_name,
            'lastName': self.user.last_name,
            'email': self.user.email,
            'isActive': self.user.is_active,
            'countryId': self.country_id,
            'checkResult': self.check_result
        }

    def set_data(self, dict):
        self.user.first_name = dict.get('firstName')
        self.user.last_name = dict.get('lastName')
        self.user.email = dict.get('email')
        self.country_id = dict.get('countryId')

    class Meta:
        db_table = 'uber_partners'
        verbose_name = 'Uber partner'
        verbose_name_plural = 'Uber partners'
