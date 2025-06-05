const NominaService = require('../public/services/horasService');

class HorasController {
  async guardarHoras(req, res) {
    try {
      const datos = req.body;
      const resultado = await NominaService.registrarHoras(datos);
      res.status(201).json(resultado);
    } catch (error) {
      console.error("Error al guardar horas:", error.message);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new HorasController();
