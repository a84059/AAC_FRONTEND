   
let urlBase4 = "https://b202-back-webitcloud.c9users.io";
let isNew4 = true;

   
    let elementForm4;
    

    document.getElementById("registarTurno").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm4 = document.getElementById("registarturno");
            //chama a função para atualizar os users
            renderTurnos();
            //adicionar função de validação ao formulário
            validator4();
        }, 1000);
  
        elementForm4.onsubmit = function(e) {
            //validação do formulário ao submeter
            validator4(); 
            
        };

    });





    //função de validação
    function validator4() {
        let validator4 = new Validator(document.querySelector('form[id="registarturno"]'), function

            (err, res) {
                //se validador for válido, res=true e executa o saveUsers()

                if (res) {
                    inicio(isNew4);

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
    
    function inicio(isNew4) {

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um orador

        if (isNew4 == true) {

            const data = {};

            data.id_evento = document.getElementById("idEvento").value;
            data.datahorarioinicio = document.getElementById("turnoDataInicio").value;
            data.datahorariofim = document.getElementById("turnoDataFim").value;
            data.Designacao = document.getElementById("turnoDesignacao").value;

            // Adiciona Elementos
            fetch(`${urlBase4}/eventosturnos`, {
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
                            text: 'Email ou Username duplicados!',
                        });
                    }
                }

                else {
                    document.getElementById("registarturno").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Registo feito com sucesso!',
                    });
                   renderTurnos();
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

            data.id_evento = document.getElementById("idEvento").value;
            data.datahorarioinicio = document.getElementById("turnoDataInicio").value;
            data.datahorariofim = document.getElementById("turnoDataFim").value;
            data.Designacao = document.getElementById("turnoDesignacao").value;

            console.log(valueID)

            fetch(`${urlBase4}/eventosturnos/${valueID}`, {
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
                            text: 'Email ou Username duplicados!',
                        });
                    }
                    if (response.status === 400) {
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Email ou Username duplicados!',
                        });
                    }
                }
                else {
                    document.getElementById("registarturno").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Update feito com sucesso!',
                    });
                   renderTurnos();
                  isNew4 = true;
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
        isNew4 = true;
        renderTurnos();
    }

       




    const renderTurnos = async() => {
    
        const renderTurnos = document.getElementById("result10");

        let strHtml = "";
        strHtml += "<table class='table' style=' padding:10px; width:70%; margin:0% 15% 0% 15%'>";
        strHtml += "<thead style='background-color:#76afe8; color:white '>";
        strHtml += "<tr style='text-align:center'><th>ID</th><th>ID de Evento</th><th>Data Início</th><th>Data Fim</th><th>Designação</th><th>Editar</th><th>Remover</th></tr></thead><tbody>";


        const response = await fetch(`${urlBase4}/eventosturnos`)
        const turnos = await response.json();
        let i = 1;
        for (const turno of turnos) {
            
            strHtml += `
                <tr>
                    <td style='text-align:center'>${turno.id_eventoturnos}</td>
                    <td>${turno.id_evento}</td>
                    <td>${turno.datahorarioinicio}</td>
                    <td>${turno.datahorariofim}</td>
                    <td>${turno.Designacao}</td>
                    <td name="edit">
                        <button class='fas fa-edit edit' id="${turno.id_eventoturnos}">
                        </td>
                        <td name="remove"><button class='fas fa-trash-alt remove' id="${turno.id_eventoturnos}">
                    </td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody></table";
        renderTurnos.innerHTML = strHtml;
        
    editTurno();
        removerTurno();
        // Gerir o clique no ícone de Editar  
        
        function editTurno() {

            const btnEdit = document.getElementsByClassName("edit");
            console.log("edit");
            for (let i = 0; i < btnEdit.length; i++) {
            
                btnEdit[i].addEventListener("click", () => {
                    isNew4 = false;
                    const valuet = event.srcElement.id;

                    console.log(turnos);
                    for (const turno of turnos) {
                        if (turno.id_eventoturnos == valuet) {
                            valueID = valuet;

                            console.log(valuet);
                                
                                document.getElementById("idEvento").value = turno.id_evento,
                                document.getElementById("turnoDataInicio").value = turno.datahorarioinicio,
                                document.getElementById("turnoDataFim").value = turno.datahorariofim,
                                document.getElementById("turnoDesignacao").value = turno.Designacao;

                        }
                    }
                });
            }
        }

        // Gerir o clique no ícone de Remover    
        function removerTurno(id_evento) {
                        console.log("remover");

            const btnDelete = document.getElementsByClassName("remove");
            for (let i = 0; i < btnDelete.length; i++) {
                console.log(i);
                btnDelete[i].addEventListener("click", () => {

                    swal({
                        title: 'Tem a certeza?',
                        text: "Não será possível reverter a remoção!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Remover'
                    }).then(async(result) => {
                        if (result.value) {
                            let elementoId = btnDelete[i].getAttribute("id");
                            try {
                                console.log(elementoId)
                                const response = await fetch(`${urlBase4}/turnos/${elementoId}`, {
                                    method: "DELETE"
                                });
                                if (response.status == 204) {
                                    swal('Removido!', 'O Turno foi removido da Lista de Turnos.', 'success')
                                    document.getElementById("registarturno").reset();
                                }
                            }
                            catch (err) {
                                swal({
                                    type: 'error',
                                    title: 'Erro',
                                    text: err
                                });
                            }
                           renderTurnos();
                        }
                    });
                });
            }
        }

    };
    
