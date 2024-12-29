// Formulario
document.getElementById('contactForm').addEventListener('su bmit', function(event) {
   // console.log(event);
   
    event.preventDefault(); // Prevent form submission initially
    const name = document.getElementById('name').value.trim();
    const mail = document.getElementById('mail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('mesage').value.trim();
    const errorMessage = document.getElementById('error-message');
    
    // Clear any previous error message
    errorMessage.textContent = "";

    // Regular Expression for Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation Logic
    if (!name || !mail || !phone || !message) {
        errorMessage.textContent = "Llenar los campos requeridos.";
        return; // Stop the function execution
    }

    if (!emailRegex.test(mail)) {
        errorMessage.textContent = "Por favor, ingrese un correo electrónico válido.";
        return;
    }

    if (isNaN(phone) || phone <= 0) {
        errorMessage.textContent = "Por favor, ingrese un número de teléfono válido.";
        return;
    }

    // If all validations pass, submit the form
    errorMessage.textContent = ""; // Clear error message
    alert(
       "Formulario enviado correctamente."+
       'Nombre: ' +name+', '+
       'Correo: ' +mail+', '+
       'Teléfono: ' +phone+', '+ 
       'Mensaje: ' +message+', '
    );
    document.getElementById('contactForm').submit();

    console.log(name);
    console.log(mail);
    console.log(phone);
    console.log(message);

});