const mysql = requiere ('mysql12');

//Configuracion de conexion MySQL
const pool = mysql.CreatePool({
    host: 'localhost',
    user: 'root',
    password: '',
    //Este es el nombre de la base de datos y asi deberá de llamarse
    database: 'restauranteElectiva',
    // 
    waitForConnections: true,
    // cantidad de request a la vez
    connectionLimit: 10,
    // cantidad de request en cola
    queueLimit: 0

});

const promisePool = pool.promise();

class UserRepository{
    //Simulacion de la busqueda de un usuario por cedula
    async findByDocumentNumber(documentNumber) {
        console.log(documentNumber)
        //Implementacion que consulta en la base de datos
        //Retorna el usuario si existe, o null si no existe
        const[rows]= await promisePool.query(SELECT * FROM users WHERE username = ?',[documentNumber]);
        return rows.length > 0 ? rows[0] : null;
    }

}