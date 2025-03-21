const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require('../controllers/controllerRegistrer');

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Ruta para la página de empleados
router.get('/empleados', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/indexEmpleados.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/indexRegistrer.html'));
});

// Ruta para manejar POST /register
router.post('/register', registerController.register);

module.exports = router;