import re
from datetime import datetime

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models

from upartner.file.models import File
from upartner.partner.models import Partner
from upartner.utils.choices import CheckResultChoice

class CheckFile(models.Model):
    file = models.OneToOneField(
        File,
        on_delete=models.CASCADE,
        db_column='file_id')
    is_imported = models.BooleanField()
    date_created = models.DateTimeField()
    date_imported = models.DateTimeField()

    def mark_imported(self):
        if self.is_imported:
            raise ValidationError('Cannot import same file twice')

        self.is_imported = True
        self.date_imported = datetime.now()

    class Meta:
        db_table = 'uber_check_files'
        verbose_name = 'Uber check file'
        verbose_name_plural = 'Uber check files'


class Check(models.Model):
    name_regex = re.compile(r'^\s*(.+)\s+(.+)\s*$', re.IGNORECASE)

    check_file = models.ForeignKey(
        CheckFile,
        on_delete=models.CASCADE,
        db_column='check_file_id',
        verbose_name='partner_check',
        related_name='partner_check'
    )

    id_str = models.TextField()
    name = models.TextField()
    result = models.TextField()

    partner_id = models.IntegerField(null=True)

    check_result = models.CharField(
        max_length=2,
        choices=CheckResultChoice.get_values(),
        default=None)

    is_valid = models.BooleanField()
    error = models.TextField()

    def validate(self, first_name, last_name):
        name_match = None if self.name is None \
            else self.name_regex.match(self.name)

        if self.partner_id is None:
            self.error = 'Partner not found or already has been checked.'
        elif self.name is None:
            self.error = 'Partner\'s name is missing.'
        elif not name_match or \
                name_match.group(1) != first_name or \
                name_match.group(2) != last_name:
            self.error = 'Invalid partner name'
        elif self.result is None:
            self.error = 'Partner\'s result is missing'
        elif self.check_result is None:
            self.error = 'Invalid result'

        self.is_valid = not self.error

    class Meta:
        db_table = 'uber_checks'
        verbose_name = 'Uber check'
        verbose_name_plural = 'Uber checks'