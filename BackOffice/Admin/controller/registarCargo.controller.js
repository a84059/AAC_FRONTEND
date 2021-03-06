let urlBase3 = "https://b202-back-webitcloud.c9users.io";
let isNew3 = true;

 let elementForm3;
    

    document.getElementById("registarCargo").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm3 = document.getElementById("registarcargo");
            //chama a função para atualizar os users
            renderCargos();
            //adicionar função de validação ao formulário
            validator3();
        }, 1000);
  
        elementForm3.onsubmit = function(e) {
            //validação do formulário ao submeter
            validator3(); 
            
        };

    });





    //função de validação
    function validator3() {
        let validator3 = new Validator(document.querySelector('form[id="registarcargo"]'), function

            (err, res) {
                //se validador for válido, res=true e executa o saveUsers()

                if (res) {
                    inicio(isNew3);

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
    
    function inicio(isNew3) {

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um orador

        if (isNew3 == true) {

            const data = {};

            data.descricao = document.getElementById("cargoDescricao").value;

            // Adiciona Elementos
            fetch(`${urlBase3}/eventoscargos`, {
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
                    document.getElementById("registarcargo").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Registo feito com sucesso!',
                    });
                   renderCargos();
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

            data.descricao = document.getElementById("cargoDescricao").value;

            console.log(valueID)

            fetch(`${urlBase3}/eventoscargos/${valueID}`, {
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
                    document.getElementById("registarcargo").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Update feito com sucesso!',
                    });
                   renderCargos();
                  isNew3 = true;
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
        isNew3 = true;
        renderCargos();
    }

      




    const renderCargos = async() => {
    
        const renderCargos= document.getElementById("result50");

        let strHtml = "";
        strHtml += "<table class='table' style=' padding:10px; width:70%; margin:0% 15% 0% 15%'>";
        strHtml += "<thead style='background-color:#76afe8; color:white '>";
        strHtml += "<tr style='text-align:center'><th>ID</th><th>Descrição</th><th>Remover</th></tr></thead><tbody>";


        const response = await fetch(`${urlBase3}/eventoscargos`)
        const cargos = await response.json();
        let i = 1;
        for (const cargo of cargos) {
            
            strHtml += `
                <tr>
                    <td style='text-align:center'>${cargo.id_eventocargos}</td>
                    <td>${cargo.descricao}</td>
                    
                        <td name="remove"><button class='fas fa-trash-alt remove' id="${cargo.id_eventocargos}">
                    </td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody></table";
        renderCargos.innerHTML = strHtml;
        
        removerCargo();



        // Gerir o clique no ícone de Remover    
        function removerCargo(id_eventocargos) {
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
                                const response = await fetch(`${urlBase3}/eventoscargos/${elementoId}`, {
                                    method: "DELETE"
                                });
                                if (response.status == 204) {
                                    swal('Removido!', 'O Cargo foi removido da Lista de Cargos.', 'success')
                                    document.getElementById("registarcargo").reset();
                                }
                            }
                            catch (err) {
                                swal({
                                    type: 'error',
                                    title: 'Erro',
                                    text: err
                                });
                            }
                           renderCargos();
                        }
                    });
                });
            }
        }

    };
    
