const urlBase6 = "https://b202-back-webitcloud.c9users.io";
let isNew6 = true;




    let elementForm6;

    document.getElementById("registarMontante").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm6 = document.getElementById("registarmontante");
            //chama a função para atualizar os users
            renderMontante();
            //adicionar função de validação ao formulário
            validator6();
        }, 1000);
        elementForm6.onsubmit = function(e) {
            //validação do formulário ao submeter
            validator6();
        };
    });



    //função de validação
    function validator6() {
        let validator6 = new Validator(document.querySelector('form[id="registarmontante"]'), function

            (err, res) {
                //se validador for válido, res=true e executa o saveUsers()

                if (res) {
                    inicio(isNew6);
                }
            }, { //cria novas regras, verificase o valor do campo que valida é igual ao campo pwd

                rules: {
                    password: function(value) {
                        return (value === document.getElementById("passwordregister").value);
                    }
                },
                messages: {
                    en: {
                        password: {
                            correct: "",
                            incorrect: "As passwords não correspondem"
                        }
                    }
                }
            });

    }


    function inicio(isNew6) {

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um orador

        if (isNew6 == true) {

            const data = {};

            data.valor = document.getElementById("montanteregister").value;
            data.email = document.getElementById("emailregister").value;
            data.dia = document.getElementById("dataregister").value;
            
         

            // Adiciona Elementos
            fetch(`${urlBase6}/montante`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(function(response) {

                if (!response.ok) {
                    console.log(response.status); //=> number 100–599
                    console.log(response.statusText); //=> String
                    console.log(response.headers); //=> Headers
                    console.log(response.url); //=> String


                    if (response.status === 409) {
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Erro!',
                        });
                    }
                }

                else {
                    document.getElementById("registardoacao").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Registo feito com sucesso!',
                    });
                    renderMontante();
                }
            }).then(function(result) {
                console.log(result);
            }).catch(function(err) {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Um erro inesperado aconteceu!',

                });
                console.error(err);
            });


        }

        else {
            const valuet = event.srcElement.id;
            const data = {};

            data.valor = document.getElementById("montanteregister").value;
            data.email = document.getElementById("emailregister").value;
            data.dia = document.getElementById("dataregister").value;
            
            const valuetID = document.getElementById("id10").value;

            console.log(valuetID)

            fetch(`${urlBase6}/montante/${valuetID}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(data)

            }).then(function(response) {

                if (!response.ok) {
                    console.log(response.status); //=> number 100–599
                    console.log(response.statusText); //=> String
                    console.log(response.headers); //=> Headers
                    console.log(response.url); //=> String


                    if (response.status === 409) {
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Erro!',
                        });
                    }
                }
                else {
                    document.getElementById("registardoacao").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Update feito com sucesso!',
                    });
                    renderMontante();

                }
            }).then(function(result) {
                console.log(result);
            }).catch(function(err) {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Um erro inesperado aconteceu!',

                });
                console.error(err);
            });
        }
        isNew6 = true;
        renderMontante();
    }






    const renderMontante = async() => {
    
        const renderMontante = document.getElementById("result3");

        let strHtml = "";
        strHtml += "<table class='table' style=' padding:10px; width:70%; margin:0% 15% 0% 15%'>";
        strHtml += "<thead style='background-color:#76afe8; color:white '>";
        strHtml += "<tr style='text-align:center'><th>ID</th><th>Email</th><th>Montante</th><th>Data</th></tr></thead><tbody>";


        const response = await fetch(`${urlBase6}/montante`)
        const montantes = await response.json();
        let i = 1;
        for (const montante of montantes) {
            
            strHtml += `
                <tr>
                    <td style='text-align:center'>${montante.id_montante}</td>
                    <td>${montante.email}</td>
                    <td>${montante.valor}</td>
                    <td>${montante.dia}</td>
       
                        
                    
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody></table";
        renderMontante.innerHTML = strHtml;
        
        editMontante();
        

        // Gerir o clique no ícone de Editar  
        
        function editMontante() {

            const btnEdit = document.getElementsByClassName("edit");

            for (let i = 0; i < btnEdit.length; i++) {
                btnEdit[i].addEventListener("click", () => {
                    isNew6 = false;
                    const valuet = event.srcElement.id;
                    console.log(montantes);
                    for (const elemento of montantes) {
                        if (elemento.id_montante == valuet) {
                            valueID = valuet;
                            console.log(valuet);
                                document.getElementById("montanteregister").value = elemento.valor,
                                document.getElementById("emailregister").value = elemento.email,
                                document.getElementById("dataregister").value = elemento.dia,
                                document.getElementById("id10").value = elemento.id_montante
                        }
                    }
                });
            }
        }



};
