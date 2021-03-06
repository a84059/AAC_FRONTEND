const btnLogin = document.getElementById("btnLogin")
  


  // Autenticar administrador na área privada
  btnLogin.addEventListener("click", function() {
   
        const email = document.getElementById('email').value
        const pass = document.getElementById('password').value
        return fetch(`https://b202-back-webitcloud.c9users.io/signin`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },          
          method: "POST",
          body: `email=${email}&password=${pass}`
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            swal.showValidationError(`Pedido falhado: ${error}`);
          }).then(result => {
      console.log(result.value)
      
      if (result.value.sucesss) {                       
          swal({title: "Autenticação feita com sucesso!"})
          window.location.replace("../../socio/index.html")  
        } else {
          swal({title: `${result.value.message.pt}`})  
        }
      
    });
  });