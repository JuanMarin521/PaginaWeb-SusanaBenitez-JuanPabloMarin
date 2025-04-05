const path = require('path');
const UserService = require('../public/services/userService');

class RegisterController {
    // Renderizar la página de registro
    getRegisterPage(req, res) {
        res.sendFile(path.join(__dirname, '../views/indexRegistrer.html'));
    }

    // Manejar el registro de usuarios
    async register(req, res) {
        try {
            const userData = req.body;
            console.log("Datos recibidos en el servidor:", userData); // Verifica los datos aquí
            const user = await UserService.registerUser(userData);
            console.log("Usuario registrado en la base de datos:", user); // Verifica el resultado aquí
            res.status(201).json(user);
        } catch (error) {
            console.error("Error en el registro:", error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new RegisterController();