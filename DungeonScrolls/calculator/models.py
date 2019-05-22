from django.db import models


class RuleSystem(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class ExperiencePointsReceived(models.Model):
    rule_system = models.ForeignKey(RuleSystem, on_delete=models.CASCADE)
    character_level = models.TextField()
    difficulty_level = models.TextField()
    experience_received = models.TextField()

    def __str__(self):
        system = "(" + str(self.rule_system) + ")"
        levels = " CL: " + str(self.character_level) + " DL: " + str(self.difficulty_level)

        return system + levels
