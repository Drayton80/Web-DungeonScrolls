from django.db import models


class RuleSystem(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class ExperiencePointsReceived(models.Model):
    rule_system = models.ForeignKey(RuleSystem, on_delete=models.CASCADE)
    character_level = models.CharField(max_length=5)
    difficulty_level = models.CharField(max_length=5)
    experience_received = models.CharField(max_length=50)

    def __str__(self):
        system = "(" + str(self.rule_system) + ")"
        levels = " CL: " + str(self.character_level) + " DL: " + str(self.difficulty_level)

        return system + levels
