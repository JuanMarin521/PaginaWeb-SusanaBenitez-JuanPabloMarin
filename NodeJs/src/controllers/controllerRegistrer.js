// 📌 Este código es para el servidor en Node.js
const path = require('path');

const controllerRegistrer = {
    // Función para mostrar la página de registro
    getRegisterPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/indexRegistrer.html'));
    },

    // Función para manejar el registro de usuarios
    register: (req, res) => {
        const { nombre, email, password, tipoUsuario, codigoTrabajador } = req.body;

        // Validar que los campos no estén vacíos
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
        }

        // Validar código de trabajador si el usuario es trabajador
        if (tipoUsuario === 'trabajador' && codigoTrabajador !== 'REST123') {
            return res.status(400).json({ message: 'Código de trabajador incorrecto.' });
        }

        // Simulación de registro exitoso (debes guardar en base de datos aquí)
        return res.status(200).json({ message: 'Registro exitoso' });
    }
};

module.exports = controllerRegistrer; 