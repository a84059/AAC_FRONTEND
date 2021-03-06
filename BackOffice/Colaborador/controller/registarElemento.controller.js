const urlBase1 = "https://b202-back-webitcloud.c9users.io";
let isNew1 = true;



    let elementForm1;
    

    document.getElementById("registarElemento").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm1 = document.getElementById("registarelemento");
            //chama a função para atualizar os users
            renderElementos();
            //adicionar função de validação ao formulário
            validator1();
        }, 1000);
  
        elementForm1.onsubmit = function(e) {
            //validação do formulário ao submeter
            validator1(); 
            
        };

    });





    //função de validação
    function validator1() {
        let validator1 = new Validator(document.querySelector('form[id="registarelemento"]'), function

            (err, res) {
                //se validador for válido, res=true e executa o saveUsers()

                if (res) {
                    inicio(isNew1);

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
    

    function select() {

        var e = document.getElementById("funcaoregister");
        var strUser = e.options[e.selectedIndex].value;
        return strUser;
    }

    function inicio(isNew1) {

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um orador

        if (isNew1 == true) {

            const data = {};

            data.username = document.getElementById("usernameregister").value;
            data.email = document.getElementById("emailregister").value;
            data.password = document.getElementById("passwordregister").value;
            data.nome_completo = document.getElementById("nomecompletoregister").value;
            data.funcao = select();

            // Adiciona Elementos
            fetch(`${urlBase1}/pessoa`, {
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
                    document.getElementById("registarelemento").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Registo feito com sucesso!',
                    });
                   renderElementos();
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

            data.username = document.getElementById("usernameregister").value;
            data.email = document.getElementById("emailregister").value;
            data.password = document.getElementById("passwordregister").value;
            data.nome_completo = document.getElementById("nomecompletoregister").value;
            data.funcao = select();

            console.log(valueID)

            fetch(`${urlBase1}/pessoas/${valueID}`, {
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
                    document.getElementById("registarelemento").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Update feito com sucesso!',
                    });
                   renderElementos();
                  isNew1 = true;
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
        isNew1 = true;
        renderElementos();
    }

        




    const renderElementos = async() => {
    
        const renderUsers = document.getElementById("result20");

        let strHtml = "";
        strHtml += "<table class='table' style=' padding:10px; width:70%; margin:0% 15% 0% 15%'>";
        strHtml += "<thead style='background-color:#76afe8; color:white '>";
        strHtml += "<tr style='text-align:center'><th>ID</th><th>Username</th><th>Nome</th><th>Email</th><th>Função</th></tr></thead><tbody>";


        const response = await fetch(`${urlBase1}/pessoas`)
        const users = await response.json();
        let i = 1;
        for (const user of users) {
            
            strHtml += `
                <tr>
                    <td style='text-align:center'>${user.id_mec}</td>
                    <td>${user.username}</td>
                    <td>${user.nome_completo}</td>
                    <td>${user.email}</td>
                    <td>${user.funcao}</td>
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody></table";
        renderUsers.innerHTML = strHtml;
        
    editUser();
        removerUser();
        // Gerir o clique no ícone de Editar  
        
        function editUser() {

            const btnEdit = document.getElementsByClassName("edit");
            console.log("edit");
            for (let i = 0; i < btnEdit.length; i++) {
            
                btnEdit[i].addEventListener("click", () => {
                    isNew1 = false;
                    const valuet = event.srcElement.id;

                    console.log(users);
                    for (const elemento of users) {
                        if (elemento.id_mec == valuet) {
                            valueID = valuet;

                            console.log(valuet);
                                
                                document.getElementById("usernameregister").value = elemento.username,
                                document.getElementById("emailregister").value = elemento.email,
                                document.getElementById("nomecompletoregister").value = elemento.nome_completo,
                                document.getElementById("passwordregister").value = elemento.password
                                document.getElementById("funcaoregister").value = elemento.funcao;

                        }
                    }
                });
            }
        }

        // Gerir o clique no ícone de Remover    
        function removerUser(idmec) {
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
                                const response = await fetch(`${urlBase1}/pessoas/${elementoId}`, {
                                    method: "DELETE"
                                });
                                if (response.status == 204) {
                                    swal('Removido!', 'O Elemento foi removido da Lista de Elementos.', 'success')
                                    document.getElementById("registarelemento").reset();
                                }
                            }
                            catch (err) {
                                swal({
                                    type: 'error',
                                    title: 'Erro',
                                    text: err
                                });
                            }
                           renderElementos();
                        }
                    });
                });
            }
        }

    };
    
