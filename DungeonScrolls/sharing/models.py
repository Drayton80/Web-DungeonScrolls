from django.db import models
from django.contrib.auth.models import User


class Shareable(models.Model):
    # Attributes:
    STATUS_TYPES = [
        ('PU', 'Public'),
        ('PR', 'Private')
    ]

    status = models.CharField(max_length=2, choices=STATUS_TYPES)

    # Relationships:
    users_that_see = models.ManyToManyField(User, related_name='%(app_label)s_%(class)s_see')
    users_that_edit = models.ManyToManyField(User, related_name='%(app_label)s_%(class)s_edit')

    class Meta:
        abstract = True
    