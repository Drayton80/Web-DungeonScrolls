function generate_experience_calculator_formulary(select_id, html_tag_id){
    // Instancia um objeto da Tag em que será gerada o HTML relativa ao formulário da calculadora de pontos de experiência:
    var tag_object = document.getElementById(html_tag_id);
    var select = document.getElementById(select_id);

    //tag_object.innerHTML = select.options[select.selectedIndex].value;

    /*const to_send = {rule_system_selected_id: select.options[select.selectedIndex].value};
    const to_send_json = JSON.stringify(to_send);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "../views.py");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(to_send_json);*/

    $.ajax({
        url:"/calculator/experience-points",
        type: "POST",
        data: {
            rule_system_selected_id: select.options[select.selectedIndex].value,
             csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(),
        },
        success:function(response){},
        complete:function(){},
        error:function (xhr, textStatus, thrownError){
            alert("error doing something");
        }
    });
}