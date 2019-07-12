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
    shared_with = models.ManyToManyField(User)

    class Meta:
        abstract = True
    