    

    
    const urlBase = "https://b202-back-webitcloud.c9users.io";
    let elementForm14;
    document.getElementById("tabelaParticipantes").addEventListener("click", function() {
        setTimeout(function() {
            //do something once
            elementForm14 = document.getElementById("tabelaparticipantes")
            //chama a função para atualizar os users
          
            //adicionar função de validação ao formulário
            validator();
        }, 1000)
    });
    elementForm14.onsubmit = function(e) {
        //validação do formulário ao submeter
        validator();
    };

    function validator() {
        let validator = new Validator(document.querySelector('form[id="tabelaparticipantes"]'), function(err, res) {
            if (res) {
                mostraEvento();
            }
        });
    }

    function mostraEvento() {
        const idevento = document.getElementById("pesquisar").value;
        console.log(idevento); //debugging para ver os dados que foram enviados

        async function fetchAsync() {
const renderParticipantes = document.getElementById("result14");

        let strHtml = "";
        strHtml += "<table class='table' style=' padding:10px; width:70%; margin:0% 15% 0% 15%'>";
        strHtml += "<thead style='background-color:#76afe8; color:white '>";
        strHtml += "<tr style='text-align:center'><th>ID</th><th>Username</th><th>Nome</th><th>Email</th><th>Função</th><th>Editar</th><th>Remover</th></tr></thead><tbody>";


        const response = await fetch(`${urlBase}/${idevento}/pessoas`)
        const eventos = await response.json();
        let i = 1;
        for (const evento of eventos) {
            
            
            strHtml += `
                <tr>
                    <td style='text-align:center'>${eventos.id_utilizadoreseventocargos}</td>
                    <td>${evento.id_eventocargos}</td>
                    <td>${evento.id_mec}</td>
                    <td>${evento.id_eventoturnos}</td>
                    <td name="edit">
                        <button class='fas fa-edit edit' id="${evento.id_utilizadoreseventocargos}">
                        </td>
                        <td name="remove"><button class='fas fa-trash-alt remove' id="${evento.id_utilizadoreseventocargos}">
                    </td>
                </tr>
            `;
            i++;
            }
        
                strHtml += "</tbody></table";
        renderParticipantes.innerHTML = strHtml;
    }

}