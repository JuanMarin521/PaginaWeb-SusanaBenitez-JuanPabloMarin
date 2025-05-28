const path = require('path');
const UserService = require('../public/services/userService');

class LoginController {
  // Renderizar la página de registro
  getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/InicioSesion.html'));
  };

  // Manejar el login de usuarios generales
  async login(req, res) {
    try {
      const userData = req.body;
      const user = await UserService.loginUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

    async loginEmpleados(req, res) {
    try {
        const userData = req.body;
        const user = await UserService.loginUser(userData, true); // Requiere ser trabajador
        res.status(200).json(user);
    } catch (error) {
        res.status(403).json({ error: error.message });}
    }
  }


module.exports = new LoginController();
