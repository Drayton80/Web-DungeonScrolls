from calculator.models import ExperiencePointsReceived, RuleSystem
import pandas as pd

xp_received_table = pd.read_csv("tables/dnd35_dungeonmasterguide_table26.csv", low_memory=False)
all_nds_under_nd1_names = ['1/10', '1/8', '1/6', '1/4', '1/3', '1/2']
all_nds_under_nd1_values = [0.1, 0.125, 0.1666, 0.25, 0.3333, 0.5]
all_nds = xp_received_table.keys().to_list()
all_nds.pop(0)

RuleSystem(name='Dungeons & Dragons: 3.5', description="").save()
dnd35 = RuleSystem.objects.filter(name='Dungeons & Dragons: 3.5').first()

instance_index = -1

for character_level in xp_received_table['Nivel_Personagem'].to_list():
    instance_index += 1
    for difficulty_level in all_nds:
        if difficulty_level == 'ND1':
            for index in range(len(all_nds_under_nd1_names)):
                xp_under_nd1 = int(float(xp_received_table.at[instance_index, difficulty_level]) * all_nds_under_nd1_values[index])
                ExperiencePointsReceived(rule_system=dnd35, character_level=str(character_level), difficulty_level=all_nds_under_nd1_names[index], experience_received=str(xp_under_nd1)).save()
        ExperiencePointsReceived(rule_system=dnd35, character_level=str(character_level), difficulty_level=str(difficulty_level)[2:], experience_received=str(xp_received_table.at[instance_index, difficulty_level])).save()
