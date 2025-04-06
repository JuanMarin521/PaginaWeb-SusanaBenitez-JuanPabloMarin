const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require('../controllers/controllerRegistrer');
const loginController = require('../controllers/controllerLogin');

// Ruta para la página de inicio
//Metodos de API
//GET: se usa para traer recursos existentes
//POST: se usa para crear un recurso nuevo en el servidor (registros,sesiones)
//Delete: se usa para eliminar un recurso existente en el servidor
//PUT: se usa para actualizar completamente un registro(recurso) existente en el servidor
//PATCH: se usa para actualizar parcialmente un recurso existente en el servidor

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/InicioSesion.html'));
});

// Ruta para la página de empleados
router.get('/empleados', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/LoguinEmpleados.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/Registrer.html'));
});

// Ruta para manejar POST /register
router.post('/register', registerController.register);

router.post('/login', loginController.login)

module.exports = router;