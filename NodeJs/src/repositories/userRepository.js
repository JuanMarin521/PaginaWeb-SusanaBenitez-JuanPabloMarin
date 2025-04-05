const mysql = require ('mysql2');

//Configuracion de conexion MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    //Este es el nombre de la base de datos y asi deberá de llamarse
    database: 'restaurante',
    // 
    waitForConnections: true,
    // cantidad de request a la vez
    connectionLimit: 10,
    // cantidad de request en cola
    queueLimit: 0

});



const promisePool = pool.promise();

promisePool.getConnection()
    .then(() => console.log("Conexión a la base de datos exitosa"))
    .catch(err => console.error("Error al conectar a la base de datos:", err.message));
    
class UserRepository {

        // Simulación de la búsqueda de un usuario por cédula
    async findByDocumentNumber(documentNumber) {
        console.log(documentNumber)
            // Implementación que consulta en la base de datos
            // Retorna el usuario si existe, o null si no existe
           const[rows]= await promisePool.query('SELECT * FROM users WHERE documentNumber = ?', [documentNumber]);
            return rows.length > 0 ? rows[0] : null;

        }
    
        // Simulación de la búsqueda de un usuario por nombre de usuario
        async findByUsername(username) {
            // Implementación que consulta en la base de datos
            // Retorna el usuario si existe, o null si no existe
            const[rows]= await promisePool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length > 0 ? rows[0] : null;

    }

    
    async createUser(user) {
        const { fullName, documentType, documentNumber, email, phone, username, password } = user;
        try {
            const [result] = await promisePool.query(
                `INSERT INTO users (fullName, documentType, documentNumber, email, phone, username, password) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [fullName, documentType, documentNumber, email, phone, username, password]
            );
            return { id: result.insertId, ...user };
        } catch (err) {
            console.error("Error al insertar en la base de datos:", err.message);
            throw new Error(err.message);
        }
    }
}

module.exports = new UserRepository();