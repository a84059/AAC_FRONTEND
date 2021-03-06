function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.forgotpasswordBox').fadeOut('fast');
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        
        $('.modal-title').html('Registar com');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.forgotpasswordBox').fadeOut('fast');
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Entrar com');
    });       
     $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

function loginAjax(){
    /*   Remove this comments when moving to server
    $.post( "/login", function( data ) {
            if(data == 1){
                window.location.replace("/home");            
            } else {
                 shakeModal(); 
            }
        });
    */

/*   Simulate error message from the server   */
     shakeModal();
}

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Credenciais incorretas!");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}


function showForgotPasswordForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.forgotpasswordBox').fadeIn('fast');
       $('.login-footer').fadeOut('fast',function(){
            $('.password-footer').fadeIn('fast');
        });
        
        $('.modal-title').html('Recuperar Password');
    });
    $('.error').removeClass('alert alert-danger').html('');
    }
    

    
    
    
    
    function openForgotPasswordModal(){
    showForgotPasswordForm();
    setTimeout(function(){
        $('#Modal').modal('show');    
    }, 230);}
   