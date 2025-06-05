document.getElementById('registroHorasForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  clearErrors();

  const documentNumber = document.getElementById('documentNumber').value;
  const fecha = document.getElementById('fecha').value;
  const entrada = document.getElementById('entrada').value;
  const salida = document.getElementById('salida').value;

  let isValid = true;

  if (!documentNumber || isNaN(documentNumber)) {
    showError('documentNumberError', 'Número de documento inválido.');
    isValid = false;
  }

  if (!fecha) {
    showError('fechaError', 'La fecha es obligatoria.');
    isValid = false;
  }

  if (!entrada) {
    showError('entradaError', 'La hora de entrada es obligatoria.');
    isValid = false;
  }

  if (!salida || salida <= entrada) {
    showError('salidaError', 'La hora de salida debe ser mayor a la entrada.');
    isValid = false;
  }

  function calcularHoras(entrada, salida, fecha) {
    const e = new Date(`${fecha}T${entrada}`);
    const s = new Date(`${fecha}T${salida}`);
    const diff = (s - e) / 3600000;
    return parseFloat(diff.toFixed(2));
  }

  const horasTrabajadas = calcularHoras(entrada, salida, fecha);

  if (isValid) {
    try {
      const response = await fetch('/nomina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentNumber,
          fecha,
          hora_entrada: entrada,
          hora_salida: salida,
          horas_trabajadas: horasTrabajadas,
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert('Horas registradas correctamente');
        document.getElementById('registroHorasForm').reset();
      } else {
        alert(result.error || 'Error al guardar las horas');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar las horas');
    }
  }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('/logout', { method: 'POST' });
    if (response.ok) {
      alert('Sesión cerrada');
      window.location.href = '/LoginEmpleados.html';
    } else {
      alert('Error al cerrar sesión');
    }
  } catch (err) {
    console.error(err);
    alert('Ocurrió un error al cerrar la sesión');
  }
});

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.innerText = '');
}

function showError(id, message) {
  document.getElementById(id).innerText = message;
}
