document.addEventListener('DOMContentLoaded', function () {

    // ✅ Mostrar el campo de código de trabajador con animación
    userType.addEventListener('change', function () {
        if (userType.value === 'trabajador') {
            codigoTrabajadorContainer.classList.remove('hidden');
            codigoTrabajadorContainer.classList.add('fade-in');
        } else {
            codigoTrabajadorContainer.classList.add('hidden');
            codigoTrabajadorContainer.classList.remove('fade-in');
        }
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