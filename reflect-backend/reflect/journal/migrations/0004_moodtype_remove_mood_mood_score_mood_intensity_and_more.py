# Generated by Django 5.1.3 on 2025-01-14 19:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("journal", "0003_remove_journalentry_audio_url_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="MoodType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("emoji", models.CharField(blank=True, max_length=10, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name="mood",
            name="mood_score",
        ),
        migrations.AddField(
            model_name="mood",
            name="intensity",
            field=models.IntegerField(
                blank=True,
                choices=[
                    (1, "Slightly"),
                    (2, "Moderately"),
                    (3, "Very"),
                    (4, "Extremely"),
                ],
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="mood",
            name="notes",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="mood",
            name="mood_type",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="journal.moodtype"
            ),
        ),
    ]
