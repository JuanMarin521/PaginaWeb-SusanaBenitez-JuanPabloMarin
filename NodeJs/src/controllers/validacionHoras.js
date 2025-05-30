document.getElementById('registroHorasForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    clearErrors();

    let entrada = document.getElementById('entrada').value;
    let salida = document.getElementById('salida').value;

    let isValid = true;

    if (!entrada) {
        showError('entradaError', 'La hora de entrada es obligatoria.');
        isValid = false;
    }

    if (!salida) {
        showError('salidaError', 'La hora de salida es obligatoria.');
        isValid = false;
    }

    if (entrada && salida && entrada >= salida) {
        showError('salidaError', 'La hora de salida debe ser mayor a la de entrada.');
        isValid = false;
    }

    if (isValid) {
        try {
            const response = await fetch('/guardarHoras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "entrada": entrada,
                    "salida": salida
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Horas guardadas correctamente.');
                document.getElementById('registroHorasForm').reset();
            } else {
                alert(result.error || 'Error al guardar las horas.');
            }

        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al registrar las horas.');
        }
    }
});

document.getElementById('logoutBtn').addEventListener('click', async function () {
    try {
        const response = await fetch('/logout', { method: 'POST' });
        if (response.ok) {
            alert('Sesión cerrada.');
            window.location.href = '/login.html';
        } else {
            alert('Error al cerrar sesión.');
        }
    } catch (error) {
        console.log('Error:', error);
        alert('Ocurrió un error al cerrar la sesión.');
    }
});

function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}