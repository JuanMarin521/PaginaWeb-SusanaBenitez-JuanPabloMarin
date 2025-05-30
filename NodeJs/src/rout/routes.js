const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require('../controllers/controllerRegister');
const loginController = require('../controllers/controllerLogin');


// Ruta para la página de inicio
//Metodos de API
//GET: se usa para traer recursos existentes
//POST: se usa para crear un recurso nuevo en el servidor (registros,sesiones)
//Delete: se usa para eliminar un recurso existente en el servidor
//PUT: se usa para actualizar completamente un registro(recurso) existente en el servidor
//PATCH: se usa para actualizar parcialmente un recurso existente en el servidor

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/clientes', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/InicioSesion.html'));
});
router.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/menu.html'));
});
router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'));
});
router.get('/reservation', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/reservation.html'));
});

// Ruta para la página de empleados
router.get('/empleados', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/LoginEmpleados.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/Register.html'));
});

router.get('/nomina', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registroHoras.html'));
});

// Ruta para manejar POST /register
router.post('/register', registerController.register);

router.post('/login', loginController.login)

router.post('/loginEmpleados', loginController.loginEmpleados);



module.exports = router;