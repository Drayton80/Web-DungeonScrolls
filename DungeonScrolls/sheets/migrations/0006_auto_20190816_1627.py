# Generated by Django 2.2.1 on 2019-08-16 19:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sheets', '0005_auto_20190814_1521'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sheet_dnd35',
            old_name='battle_equipments',
            new_name='inventory_equipments',
        ),
    ]
