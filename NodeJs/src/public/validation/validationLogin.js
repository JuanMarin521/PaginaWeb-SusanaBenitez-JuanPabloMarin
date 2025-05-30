function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}

// Validación para el formulario de login de clientes
const loginCliente = document.getElementById('login-section');
if (loginCliente) {
    loginCliente.addEventListener('submit', async function(event) {
        console.log("Iniciando validaciones cliente");
        event.preventDefault();
        clearErrors();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                alert('Login completado (cliente).');
                window.location.href = '/reservation';
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al loggear el usuario.');
        }
    });
}

// Validación para el formulario de login de trabajadores
const loginTrabajador = document.getElementById('loginTrabajador');
if (loginTrabajador) {
    loginTrabajador.addEventListener('submit', async function(event) {
        console.log("Iniciando validaciones trabajador");
        event.preventDefault();
        clearErrors();

        const username = document.getElementById('username').value;
        alert('Username se pasó con éxito: ' + username);

        const password = document.getElementById('password').value;
        alert('Password se pasó con éxito: ' + password);



        try {
            const response = await fetch('/loginEmpleados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Login completado (trabajador).');
                window.location.href = '/nomina'; //Susana poner aqui el enlace a la página de inicio del trabajador
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al loggear el trabajador.');
        }
    });
}