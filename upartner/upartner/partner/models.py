from datetime import datetime

from django.core.exceptions import ValidationError
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

from upartner.nomenclature.models import Country

import random
import string

class Partner(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        db_column='user_id',
        verbose_name='partner',
        related_name='partner')

    country = models.OneToOneField(Country, verbose_name="country")
    password = models.CharField(max_length=10)
    is_activated = models.BooleanField()

    CLEAN = 'cl'
    DOCS_DISCREPANCY = 'dd'
    FAKE_DOCS = 'fd'
    CHECK_RESULT_CHOICES = (
        (CLEAN           , 'Clean'              ),
        (DOCS_DISCREPANCY, 'Discrepancy in docs'),
        (FAKE_DOCS       , 'Fake documents'     ),
    )
    check_result = models.CharField(
        max_length=2,
        choices=CHECK_RESULT_CHOICES,
        default=FAKE_DOCS)

    @classmethod
    def _generate_password(cls):
        allowed = string.ascii_uppercase + string.digits + string.ascii_lowercase

        return ''.join(random.SystemRandom().choice(allowed) for _ in range(settings.PASSWORD_LENGTH))

    @classmethod
    def create(cls, username, first_name, last_name, email, country_id):
        currDate=datetime.utcnow()

        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            last_login=currDate,
            is_staff=False,
            is_superuser=False,
            is_active=False,
            date_joined=currDate,
        )

        user_password = cls._generate_password()
        user.set_password(user_password)
        user.save()

        partner = cls(
            country_id=country_id,
            check_result=None,
            password=user_password,
            is_activated=False,
            user=user)
        return partner

    def set_data(self, first_name, last_name, email, country_id):
        self.user.first_name = first_name
        self.user.last_name = last_name
        self.user.email = email
        self.user.save()

        self.country_id = country_id
        self.save()

    def activate(self):
        if self.user.is_active:
            raise ValidationError(
                _('Partmer %(pk) is already active.'),
                code='invalid',
                params={'pk': self.pk},
            )

        self.user.is_active=True
        self.user.save()

        self.is_activated=True
        self.password=None
        self.save()

    class Meta:
        db_table = 'uber_partners'
        verbose_name = 'Uber partner'
        verbose_name_plural = 'Uber partners'