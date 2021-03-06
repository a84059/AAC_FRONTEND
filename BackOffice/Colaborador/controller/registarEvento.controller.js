

    let isNew21 = true;

    let elementForm21;

    document.getElementById("registarEvento").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm21 = document.getElementById("registarevento");
            //chama a função para atualizar os users
            renderEventos();
            //adicionar função de validação ao formulário
            validator21()
        }, 1000);
        elementForm21.onsubmit = function(e) {
            //validação do formulário ao submeter
            validator21()
        };
    });

 //função de validação
    function validator21() {
        let validator21 = new Validator(document.querySelector('form[id="registarevento"]'), function(err, res) {
                //se validador for válido, res=true e executa o Inicio()

                if (res) {
                    inicio(isNew21);
                }
            }, { //cria novas regras, verificase o valor do campo que valida é igual ao campo pwd

                rules: {
                    nome: function(value) {
                        return (value === document.getElementById("eventoNome").value);
                    }
                },
                messages: {
                    en: {
                        password: {
                            correct: "",
                            incorrect: "Preencha o campo"
                        }
                    }
                }
            });

    }



    function inicio(isNew2) {

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um orador

        if (isNew21 == true) {

            const data = {};

            data.nome = document.getElementById("eventoNome").value;
            data.morada = document.getElementById("eventoMorada").value;
            data.datainicio = document.getElementById("eventoDataInicio").value;
            data.datafim = document.getElementById("eventoDataFim").value;
            data.hora = document.getElementById("eventoHora").value;
            console.log(data.hora)
            // Adiciona Elementos
            fetch(`https://b202-back-webitcloud.c9users.io/eventos`, {
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
                            text: 'Nome duplicado!',
                        });
                    }
                }

                else {
                    document.getElementById("registarevento").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Registo feito com sucesso!',
                    });
                    renderEventos();
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
            
            data.nome = document.getElementById("eventoNome").value;
            data.morada = document.getElementById("eventoMorada").value;
            data.datainicio = document.getElementById("eventoDataInicio").value;
            data.datafim = document.getElementById("eventoDataFim").value;
            data.hora = document.getElementById("eventoHora").value;
            
            const valuetID = document.getElementById("id3").value;

            console.log(valuetID)

            fetch(`https://b202-back-webitcloud.c9users.io/eventos/${valuetID}`, {
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
                            text: 'Nome duplicado!',
                        });
                    }
                }
                else {
                    document.getElementById("registarevento").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Update feito com sucesso!',
                    });
                    renderEventos();

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
        isNew21 = true;
        renderEventos();
    }




    const renderEventos = async() => {
        

        
        const renderEvento = document.getElementById("result21");

        let strHtml = "";
        strHtml += "<table class='table' style=' padding:10px; width:70%; margin:0% 15% 0% 15%'>";
        strHtml += "<thead style='background-color:#76afe8; color:white '>";
        strHtml += "<tr style='text-align:center'><th>ID</th><th>Nome</th><th>Morada</th><th>Data Inicio</th><th>Data Fim</th><th>Hora</th><th>Editar</th><th>Remover</th></tr></thead><tbody>";


        const response = await fetch(`https://b202-back-webitcloud.c9users.io/eventos`)
        const eventos = await response.json();
        let i = 1;
        for (const evento of eventos) {
            
            strHtml += `
                <tr>
                    <td style='text-align:center'>${evento.id_evento}</td>
                    <td>${evento.nome}</td>
                    <td>${evento.morada}</td>
                    <td>${evento.datainicio}</td>
                    <td>${evento.datafim}</td>
                    <td>${evento.hora}</td>
                    <td name="edit">
                        <button class='fas fa-edit edit' id="${evento.id_evento}">
                        </td>
                        <td name="remove"><button class='fas fa-trash-alt remove' id="${evento.id_evento}">
                    </td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody></table";
        renderEvento.innerHTML = strHtml;

        editEvento();
            
        removerEvento();
        // Gerir o clique no ícone de Editar  
        
        function editEvento() {

            const btnEdit = document.getElementsByClassName("edit");
            
            for (let i = 0; i < btnEdit.length; i++) {
                btnEdit[i].addEventListener("click", () => {
                    isNew21 = false;
                    const valuet = event.srcElement.id;
                    console.log(eventos);
                    for (const evento of eventos) {
                        if (evento.id_evento == valuet) {
                            
                            console.log(valuet);
                                document.getElementById("eventoMorada").value = evento.morada,
                                document.getElementById("eventoNome").value = evento.nome,
                                document.getElementById("id3").value = evento.id_evento
                        }
                    }
                });
            }
        }

        // Gerir o clique no ícone de Remover    
        function removerEvento() {
            
            const btnDelete = document.getElementsByClassName("remove");
            for (let i = 0; i < btnDelete.length; i++) {
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
                            let eventoId = btnDelete[i].getAttribute("id");
                            console.log(eventoId)
                            try {
                                console.log(eventoId)
                                const response = await fetch(`https://b202-back-webitcloud.c9users.io/eventos/${eventoId}`, {
                                    method: "DELETE"
                                });
                                if (response.status == 204) {
                                    swal('Removido!', 'O Evento foi removido da Lista de Eventos.', 'success')
                                    document.getElementById("registarevento").reset();
                                    
                                }
                            
                            }
                            catch (err) {
                                swal({
                                    type: 'error',
                                    title: 'Erro',
                                    text: err
                                });
                            }
                            renderEventos();
                        }
                    });
                });
                
            }
        }
    };

