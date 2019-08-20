# Generated by Django 2.2.1 on 2019-08-17 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sheets', '0007_auto_20190816_1715'),
    ]

    operations = [
        migrations.AddField(
            model_name='sheet_dnd35',
            name='battle_ca_deflection_modifier',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='sheet_dnd35',
            name='battle_ca_equipment_armor',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='sheet_dnd35',
            name='inventory_money',
            field=models.TextField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='sheet_dnd35',
            name='information_experience',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='sheet_dnd35',
            name='information_level',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]