var all_difficulty_levels;
var system_selected_id;

function generate_experience_calculator_formulary(select_id) {
    // Instancia um objeto da Tag em que será gerada o HTML relativa ao formulário da calculadora de pontos de experiência:
    var div_object = document.getElementById("experience_calculator_formulary");
    var select = document.getElementById(select_id);

    system_selected_id = select.options[select.selectedIndex].value;

    $.ajax({
        url: "/calculator/experience-points",
        type: "POST",
        data: {
            response_type: 'calculator_formulary',
            rule_system_selected_id: system_selected_id,
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },
        success: function (response_data) {
            var difficulty_level_prefix;
            var html_text = "";

            if (typeof response_data.difficulty_level_information.all_levels == 'undefined' ||
                typeof response_data.difficulty_level_information.prefix == 'undefined') {
                return;
            }

            console.log(response_data.difficulty_level_information.all_levels.split(","));
            all_difficulty_levels = response_data.difficulty_level_information.all_levels.split(",");
            difficulty_level_prefix = response_data.difficulty_level_information.prefix;

            html_text += '<div class="col">'

            html_text += '<div class="d-flex w-100 mb-4 p-0 align-items-center">'
            html_text += '<div class="col w-100 p-0 mr-2">'
            html_text += '<div class="form-group">'
            html_text += '<label for="number_of_characters">Number of Characters in Battle</label>'
            html_text += '<input  id="number_of_characters" type="number" class="form-control" min="1" value="1">'
            html_text += '</div>'
            html_text += '</div>'
            html_text += '<div class="col w-100 p-0 mt-3 ml-2">'
            html_text += '<button type="button" class="btn btn-outline-dark btn-block" onclick="calculate_experience()">Calculate</button>'
            html_text += '</div>'
            html_text += '</div>'

            html_text += '<div class="form-row">'
            for (index in all_difficulty_levels) {
                difficulty_level = difficulty_level_prefix + ' ' + all_difficulty_levels[index]
                id = all_difficulty_levels[index]

                html_text += '<div class="col-4 col-sm-3 col-md-2">'
                html_text += '<div class="form-group">'
                html_text += '<label>' + difficulty_level + '</label>'
                html_text += '<input id="' + id + '" type="number" class="form-control">'
                html_text += '</div>'
                html_text += '</div>'
            }
            html_text += '</div>'

            html_text += '<div class="row-1 mt-3">'
            html_text += '</div>'

            html_text += '</div>'

            div_object.innerHTML = html_text
        },
        complete: function () { },
        error: function (xhr, textStatus, thrownError) {
            alert("error doing something");
        }
    });
}

function calculate_experience() {
    calculator_formulary_data = {};
    calculator_formulary_data['number_of_characters'] = document.getElementById('number_of_characters').value;
    calculator_formulary_data['difficulty_levels_values'] = {};

    for (index in all_difficulty_levels) {
        number_of_enemies = document.getElementById(all_difficulty_levels[index]).value;

        if (number_of_enemies) {
            calculator_formulary_data.difficulty_levels_values[all_difficulty_levels[index]] = number_of_enemies
        }
    }

    console.log(calculator_formulary_data)

    $.ajax({
        url: "/calculator/experience-points",
        type: "POST",
        data: {
            response_type: 'calculator_result',
            rule_system_selected_id: system_selected_id,
            calculator_formulary_data: calculator_formulary_data,
            csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },
        success: function (response_data) {
            var div_object = document.getElementById("experience_calculator_result");
            var h2_title = "";
            var top_div_xp_result_text = "";
            var bottom_div_xp_result_text = "";
            var xp_result_text = "";
            html_text = '';

            if (typeof response_data.experience_points_per_level == 'undefined') {
                return;
            }

            h2_title = '<h2 class="mb-4"> Experience Received by Character\'s Level </h2>';
            top_div_xp_result_text = '<div class="row mb-4 ml-1">';
            for (character_level in response_data.experience_points_per_level) {
                character_experience_received = response_data.experience_points_per_level[character_level]

                if (character_experience_received != "0") {
                    xp_result_text += '<div class="col-3 p-0">'
                    xp_result_text += '<button type="button" class="btn btn-outline-dark btn-block" disabled>'
                    xp_result_text += 'Level ' + character_level + ' receive ' + character_experience_received + ' XP'
                    xp_result_text += '</button>'
                    xp_result_text += '</div>'
                }

            }
            bottom_div_xp_result_text += '</div>';

            if (xp_result_text != "") {
                html_text = h2_title + top_div_xp_result_text + xp_result_text + bottom_div_xp_result_text;
            } else {
                html_text = '<h2 class="mb-4">The Characters don\'t received XP</h2>'
            }

            div_object.innerHTML = html_text;

            window.scrollTo(0, document.body.scrollHeight);
        },
        complete: function () { },
        error: function (xhr, textStatus, thrownError) {
            alert("error doing something");
        }
    });
}