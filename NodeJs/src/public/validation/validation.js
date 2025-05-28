document.getElementById('registroForm').addEventListener('submit', async function(event) {
    
    event.preventDefault();
  
    clearErrors();

    let fullName = document.getElementById('fullName').value;
    let documentType = document.getElementById('documentType').value;
    let documentNumber = document.getElementById('documentNumber').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let workerCode = document.getElementById('codigoTrabajador')?.value; // Código de trabajador (puede ser opcional)

    let isValid = true;

    if (!validateFullName(fullName)) {
        showError('fullNameError', 'El nombre completo no debe contener caracteres especiales no permitidos.');
        isValid = false;
    }

    if (!validateDocumentNumber(documentNumber)) {
        showError('documentNumberError', 'El número de documento debe ser estrictamente un número.');
        alert("El número de documento debe ser estrictamente un número");
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('emailError', 'Ingrese un correo electrónico válido.');
        alert("Ingrese un correo electrónico válido");
        isValid = false;
    }

    if (!validatePhone(phone)) {
        showError('phoneError', 'Ingrese un número de teléfono válido.');
        isValid = false;
    }

    if (!validateUsername(username)) {
        showError('usernameError', 'El nombre de usuario no debe contener caracteres especiales.');
        isValid = false;
    }

    if (!validatePassword(password)) {
        showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial permitido.');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Las contraseñas no coinciden.');
        isValid = false;
    }

    // Validar el tipo de usuario y el código de trabajador
   if (isTrabajador) {
        if (!workerCode || workerCode !== '123') {
            showError('workerCodeError', 'El código de trabajador es incorrecto o no fue proporcionado.');
            isValid = false;
        }
    }

    if (isValid) {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fullName": fullName,
                    "documentType": documentType,
                    "documentNumber": documentNumber,
                    "email": email,
                    "phone": phone,
                    "username": username,
                    "password": password,
                    "isTrabajador": isTrabajador,

                    
                })
            });

            if (response.ok) {
                console.log("Respuesta del servidor:", await response.json());
                alert('Registro completado.');
                clearErrors();
                document.getElementById('registroForm').reset();
            } else {
                const result = await response.json();
                console.log("Error del servidor:", result);
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al registrar el usuario.');
        }
    }
});

function validateFullName(name) {
    let nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nameRegex.test(name);
}

function validateDocumentNumber(documentNumber) {
    let documentNumberRegex = /^[0-9]+$/;
    return documentNumberRegex.test(documentNumber);
}

function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    let phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}


function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

function validateUsername(username) {
    let usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_-]{8,}$/;
    return passwordRegex.test(password);
}