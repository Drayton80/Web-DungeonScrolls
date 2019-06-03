function generate_experience_calculator_formulary(select_id, html_tag_id){
    // Instancia um objeto da Tag em que será gerada o HTML relativa ao formulário da calculadora de pontos de experiência:
    var tag_object = document.getElementById(html_tag_id);
    var select = document.getElementById(select_id);

    $.ajax({
        url:"/calculator/experience-points",
        type: "POST",
        data: {
            rule_system_selected_id: select.options[select.selectedIndex].value,
             csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },
        success:function(response){
            console.log(response.difficulty_level_information.all_levels.split(","));
            var all_difficulty_levels = response.difficulty_level_information.all_levels.split(",");
            var difficulty_level_prefix = response.difficulty_level_information.prefix;
            var html_text = '';

            html_text += '<div class="row-1">'
            html_text += '<div class="form-group">'
            html_text += '<label for="number_of_characters">Number of Characters in Battle</label>'
            html_text += '<input  id="number_of_characters" type="number" class="form-control" min="1" value="1">'
            html_text += '</div>'
            html_text += '</div>'

            html_text += '<div class="form-row">'
            for(index in all_difficulty_levels){
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
            html_text += '<button type="button" class="btn btn-primary btn-block" onclick="calculate_experience()">Calculate</button>'
            html_text += '</div>'

            tag_object.innerHTML = html_text
        },
        complete:function(){},
        error:function (xhr, textStatus, thrownError){
            alert("error doing something");
        }
    });
}

function calculate_experience(){
    for()
}