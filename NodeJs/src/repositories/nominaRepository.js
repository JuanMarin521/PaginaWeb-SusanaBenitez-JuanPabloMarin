const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restaurante',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

promisePool.getConnection()
  .then(() => console.log("Conectado correctamente a la base de datos"))
  .catch(err => console.error("Error de conexión:", err.message));

class NominaRepository {
  async registrarHoras({ documentNumber, fecha, hora_entrada, hora_salida, horas_trabajadas }) {
    try {
      const [result] = await promisePool.query(
        `INSERT INTO nomina 
         (documentNumber, fecha, hora_entrada, hora_salida, horas_trabajadas) 
         VALUES (?, ?, ?, ?, ?)`,
        [documentNumber, fecha, hora_entrada, hora_salida, horas_trabajadas]
      );
      return { id: result.insertId };
    } catch (err) {
      console.error("Error al registrar horas:", err.message);
      throw new Error("No se pudo guardar el registro de horas.");
    }
  }

  async obtenerHorasPorDocumento(documentNumber) {
    const [rows] = await promisePool.query(`SELECT * FROM nomina WHERE documentNumber = ?`, [documentNumber]);
    return rows;
  }
}

module.exports = new NominaRepository();
