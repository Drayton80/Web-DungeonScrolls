# Generated by Django 2.2.1 on 2019-08-14 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sheets', '0003_auto_20190814_1423'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sheet_dnd35',
            name='information_size_modifier',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
