let urlBase8 = "https://b202-back-webitcloud.c9users.io";
let isNew8 = true;



    let elementForm8;
    

    document.getElementById("registarParticipantes").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm8 = document.getElementById("registarparticipantes");
            //chama a função para atualizar os users
            //renderParticipantes();
            //adicionar função de validação ao formulário
            validator8();
        }, 1000);
  
        elementForm8.onsubmit = function(e) {
            //validação do formulário ao submeter
            validator8(); 
            
        };

    });





    //função de validação
    function validator8() {
        let validator8 = new Validator(document.querySelector('form[id="registarparticipantes"]'), function

            (err, res) {
                //se validador for válido, res=true e executa o saveUsers()

                if (res) {
                    inicio(isNew8);

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
    


    function inicio(isNew8) {

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um orador

        if (isNew8 == true) {

            const data = {};

            data.id_eventocargos = document.getElementById("idpessoa").value;
            data.id_mec = document.getElementById("idEvento1").value;
            data.id_eventosturnos = document.getElementById("cargopess").value;

            // Adiciona Elementos
            fetch(`${urlBase8}/utilizadoreseventoscargos`, {
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
                            text: 'Já existente!',
                        });
                    }
                }

                else {
                    document.getElementById("registarparticipantes").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Registo feito com sucesso!',
                    });
                   //renderParticipantes();
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

            data.id_eventocargos = document.getElementById("idpessoa").value;
            data.id_mec = document.getElementById("idEvento1").value;
            data.id_eventosturnos = document.getElementById("cargopess").value;

            console.log(valueID)

            fetch(`${urlBase8}/utilizadoreseventoscargos/${valueID}`, {
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
                            text: 'Já Existente!',
                        });
                    }
                    if (response.status === 400) {
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Já Existente!',
                        });
                    }
                }
                else {
                    document.getElementById("registarparticipantes").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Update feito com sucesso!',
                    });
                   //renderParticipantes();
                  isNew8 = true;
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
        isNew8 = true;
       // renderParticipantes();
    }

        




    /*const renderParticipantes = async() => {
    
        const renderParticipantes = document.getElementById("result13");

        let strHtml = "";
        strHtml += "<table class='table' style=' padding:10px; width:70%; margin:0% 15% 0% 15%'>";
        strHtml += "<thead style='background-color:#76afe8; color:white '>";
        strHtml += "<tr style='text-align:center'><th>ID</th><th>ID Pessoa</th><th>ID Turno</th><th>ID Cargo</th><th>Editar</th><th>Remover</th></tr></thead><tbody>";


        const response = await fetch(`${urlBase8}/utilizadoreseventoscargos`)
        const participantes = await response.json();
        let i = 1;
        for (const participante of participantes) {
            
            strHtml += `
                <tr>
                    <td style='text-align:center'>${participante.id_utilizadoreseventoscargos}</td>
                    <td>${participante.id_mec}</td>
                    <td>${participante.id_eventocargos}</td>
                    <td>${participante.id_eventosturnos}</td>
                    
                    <td name="edit">
                        <button class='fas fa-edit edit' id="${participante.id_utilizadoreseventoscargos}">
                        </td>
                        <td name="remove"><button class='fas fa-trash-alt remove' id="${participante.id_utilizadoreseventoscargos}">
                    </td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody></table";
        renderParticipantes.innerHTML = strHtml;
        
    editParticipantes();
        removerParticipantes();
        // Gerir o clique no ícone de Editar  
        
        function editParticipantes() {

            const btnEdit = document.getElementsByClassName("edit");
            console.log("edit");
            for (let i = 0; i < btnEdit.length; i++) {
            
                btnEdit[i].addEventListener("click", () => {
                    isNew8 = false;
                    const valuet = event.srcElement.id;

                    console.log(participantes);
                    for (const participante of participantes) {
                        if (participante.id_utilizadoreseventoscargos == valuet) {
                            valueID = valuet;

                            console.log(valuet);
                                
                                document.getElementById("idpessoa").value = participante.id_mec,
                                document.getElementById("idevento1").value = participante.id_eventocargos,
                                document.getElementById("cargopess").value = participante.id_eventosturnos
                               

                        }
                    }
                });
            }
        }

        // Gerir o clique no ícone de Remover    
        function removerParticipantes(idmec) {
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
                                const response = await fetch(`${urlBase8}/utilizadoreseventoscargos/${elementoId}`, {
                                    method: "DELETE"
                                });
                                if (response.status == 204) {
                                    swal('Removido!', 'O Elemento foi removido da Lista de Elementos.', 'success')
                                    document.getElementById("registareparticipantes").reset();
                                }
                            }
                            catch (err) {
                                swal({
                                    type: 'error',
                                    title: 'Erro',
                                    text: err
                                });
                            }
                           renderParticipantes();
                        }
                    });
                });
            }
        }

    };
    
*/