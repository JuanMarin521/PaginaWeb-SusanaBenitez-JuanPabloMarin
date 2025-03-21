document.addEventListener('DOMContentLoaded', function() {
    const tipoUsuario = document.getElementById('tipoUsuario');
    const codigoTrabajadorContainer = document.getElementById('codigoTrabajadorContainer');
    const registroForm = document.getElementById('registroForm');
    const modoOscuroToggle = document.getElementById('modoOscuro'); // Toggle de modo oscuro

    // ✅ Mostrar campo de código si se elige "Trabajador"
    tipoUsuario.addEventListener('change', function() {
        if (tipoUsuario.value === 'trabajador') {
            codigoTrabajadorContainer.classList.remove('hidden');
        } else {
            codigoTrabajadorContainer.classList.add('hidden');
        }
    });

    // ✅ Validación del formulario
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const codigoTrabajador = document.getElementById('codigoTrabajador')?.value.trim(); // Puede no existir

        // Validar que no haya campos vacíos
        if (!nombre || !email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Validar código de trabajador
        if (tipoUsuario.value === 'trabajador' && codigoTrabajador !== 'REST123') {
            alert('Código de trabajador incorrecto.');
            return;
        }

        alert('Registro exitoso');
        registroForm.reset();
    });

    // ✅ Modo oscuro
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
        if (modoOscuroToggle) {
            modoOscuroToggle.checked = true;
        }
    }

    // Cambiar el modo oscuro y guardar en localStorage
    if (modoOscuroToggle) {
        modoOscuroToggle.addEventListener('change', function() {
            document.body.classList.toggle("dark-mode", modoOscuroToggle.checked);
            localStorage.setItem("dark-mode", modoOscuroToggle.checked ? "enabled" : "disabled");
        });
    }

    // ✅ Agregar enlace de registro en páginas de inicio de sesión (sin duplicarlo)
    const loginForms = document.querySelectorAll('.login-section form');
    loginForms.forEach(form => {
        if (!form.querySelector('.registro-link')) { // Evitar duplicados
            const registroLink = document.createElement('p');
            registroLink.classList.add('registro-link');
            registroLink.innerHTML = "¿No tienes cuenta? <a href='../views/indexRegistrer'>Regístrate aquí</a>";
            form.appendChild(registroLink);
        }
    });
});