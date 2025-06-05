const NominaRepository = require('../../repositories/nominaRepository');
const UserRepository = require('../../repositories/userRepository');

class NominaService {
  async registrarHoras({ documentNumber, fecha, hora_entrada, hora_salida, horas_trabajadas }) {
    const user = await UserRepository.findByDocumentNumber(documentNumber);
    if (!user) {
      throw new Error(`No se encontró un usuario con el número de documento: ${documentNumber}`);
    }

   /* if (user.isTrabajador != 1) {
      throw new Error('Este usuario no tiene permisos de trabajador.');
    }*/

    return await NominaRepository.registrarHoras({
      documentNumber,
      fecha,
      hora_entrada,
      hora_salida,
      horas_trabajadas
    });
  }

  async obtenerHoras(documentNumber) {
    return await NominaRepository.obtenerHorasPorDocumento(documentNumber);
  }
}

module.exports = new NominaService();
