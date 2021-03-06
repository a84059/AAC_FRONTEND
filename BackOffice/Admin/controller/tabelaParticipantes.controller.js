
    let isNew2 = true;

    let elementForm2;

    document.getElementById("tabelaParticipantes").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm2 = document.getElementById("tabelaparticipantes");
            //chama a função para atualizar os users
   
            //adicionar função de validação ao formulário
            validator2()
        }, 1000);
        elementForm2.onsubmit = function(e) {
            //validação do formulário ao submeter
            validator2()
        };
    });


    function validator2() {
        let validator = new Validator(document.querySelector('form[id="tabelaparticipantes"]'), function(err, res) {
            if (res) {
                renderEventos(identifier);
            }
        })
    }




    const renderEventos = async() => {
        

        
        const renderEvento = document.getElementById("result14");

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
                    isNew4 = false;
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
    }
    renderEventos();

