


let isNew23 = true

let elementForm23;
    

    document.getElementById("registarProduto").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm23 = document.getElementById("registarproduto");
            //chama a função para atualizar os users
            renderProdutos();
            //adicionar função de validação ao formulário
            validator23()
           
        }, 1000);
  
        elementForm23.onsubmit = function(e) {
            //validação do formulário ao submeter
            validator5(); 
            
        };

    });





    //função de validação
    function validator23() {
        let validator23 = new Validator(document.querySelector('form[id="registarproduto"]'), function(err, res) {
                //se validador for válido, res=true e executa o Inicio()

                if (res) {
                    inicio(isNew23);
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





    function inicio(isNew23) {

        // Verifica flag isNew para saber se se trata de uma adição ou de um atualização dos dados de um orador

        if (isNew23 == true) {

            const data = {};

        data.nome = document.getElementById("nomeproduto").value;
        data.categoria = document.getElementById("categoriaproduto").value;
        data.stock = document.getElementById("stockproduto").value;
        data.preco = document.getElementById("precoproduto").value;
        data.disponibilidade = document.getElementById("disponibilidadeproduto").value;
        data.descricao = document.getElementById("descricaoproduto").value;
       // data.imagem = document.getElementById("imagemproduto").value;

            // Adiciona Elementos
            fetch(`https://b202-back-webitcloud.c9users.io/produtos`, {
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
                            text: 'Produto Duplicado!',
                        });
                    }
                }

                else {
                    document.getElementById("registarproduto").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Registo feito com sucesso!',
                    });
                   renderProdutos();
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

        data.nome = document.getElementById("nomeproduto").value;
        data.categoria = document.getElementById("categoriaproduto").value;
        data.stock = document.getElementById("stockproduto").value;
        data.preco = document.getElementById("precoproduto").value;
        data.disponibilidade = document.getElementById("disponibilidadeproduto").value;
        data.descricao = document.getElementById("descricaoproduto").value;
       // data.imagem = document.getElementById("imagemproduto").value;

            console.log(valueID)

            fetch(`https://b202-back-webitcloud.c9users.io/produtos/${valueID}`, {
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
                            text: 'Produto Duplicado!',
                        });
                    }
                    if (response.status === 400) {
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Produto Duplicado!',
                        });
                    }
                }
                else {
                    document.getElementById("registarproduto").reset(); //limpeza dos dados do form
                    Swal({
                        type: 'success',
                        title: 'Nice...',
                        text: 'Update feito com sucesso!',
                    });
                   renderProdutos();
                   isNew5 = true;
                   

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
             isNew23 = true;
        }
        isNew23 = true;
        renderProdutos();
    }





    const renderProdutos = async() => {
    
        const renderProdutos = document.getElementById("result23");

        let strHtml = "";
        strHtml += "<table class='table' style=' padding:10px; width:70%; margin:0% 15% 0% 15%'>";
        strHtml += "<thead style='background-color:#76afe8; color:white '>";
        strHtml += "<tr style='text-align:center'><th>ID</th><th>Nome</th><th>Categoria</th><th>Preço</th><th>Stock</th><th>Disponibilidade</th></tr></thead><tbody>";


        const response = await fetch(`https://b202-back-webitcloud.c9users.io/produtos`)
        const produtos = await response.json();
        let i = 1;
        for (const produto of produtos) {
            
            strHtml += `
                <tr>
                    <td style='text-align:center'>${produto.id_produto}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.stock}</td>
                    <td>${produto.disponibilidade}</td>
         
                </tr>
            `;
            i++;
        }
        strHtml += "</tbody></table";
        renderProdutos.innerHTML = strHtml;
        
         editProduto();
        removerProduto();
        // Gerir o clique no ícone de Editar  
        
        function editProduto() {

            const btnEdit = document.getElementsByClassName("edit");
            console.log("edit");
            for (let i = 0; i < btnEdit.length; i++) {
            
                btnEdit[i].addEventListener("click", () => {
                    isNew23 = false;
                    const valuet = event.srcElement.id;

                    console.log(produtos);
                    for (const produto of produtos) {
                        if (produto.id_produto == valuet) {
                            valueID = valuet;

                            console.log(valuet);
                        
                        
                        document.getElementById("nomeproduto").value = produto.nome;
                        document.getElementById("categoriaproduto").value = produto.categoria;
                        document.getElementById("precoproduto").value = produto.preco;
                        document.getElementById("stockproduto").value = produto.stock;
                        document.getElementById("disponibilidadeproduto").produto = produto.disponibilidade;
                        document.getElementById("descricaoproduto").value = produto.descricao;
                       // document.getElementById("imagemproduto").value = produto.imagem;

                        }
                    }
                });
            }
        }

        // Gerir o clique no ícone de Remover    
        function removerProduto(idmec) {
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
                                const response = await fetch(`https://b202-back-webitcloud.c9users.io/produtos/${elementoId}`, {
                                    method: "DELETE"
                                });
                                if (response.status == 204) {
                                    swal('Removido!', 'O Produto foi removido da Lista de Produtos.', 'success')
                                    document.getElementById("registarproduto").reset();
                                   
                                }
                            }
                            catch (err) {
                                swal({
                                    type: 'error',
                                    title: 'Erro',
                                    text: err
                                });
                                
                            }
                           renderProdutos();
                        }
                    });
                });
            }
        }

    };
    
