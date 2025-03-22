document.addEventListener('DOMContentLoaded', function () {
    const tipoUsuario = document.getElementById('tipoUsuario');
    const codigoTrabajadorContainer = document.getElementById('codigoTrabajadorContainer');
    const registroForm = document.getElementById('registroForm');
    const modoOscuroToggle = document.getElementById('modoOscuro'); // Toggle de modo oscuro

    // ✅ Mostrar el campo de código de trabajador con animación
    tipoUsuario.addEventListener('change', function () {
        if (tipoUsuario.value === 'trabajador') {
            codigoTrabajadorContainer.classList.remove('hidden');
            codigoTrabajadorContainer.classList.add('fade-in');
        } else {
            codigoTrabajadorContainer.classList.add('hidden');
            codigoTrabajadorContainer.classList.remove('fade-in');
        }
    });

    // ✅ Validación del formulario
    registroForm.addEventListener('submit', function (event) {
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
        modoOscuroToggle.addEventListener('change', function () {
            document.body.classList.toggle("dark-mode", modoOscuroToggle.checked);
            localStorage.setItem("dark-mode", modoOscuroToggle.checked ? "enabled" : "disabled");
        });
    }
});