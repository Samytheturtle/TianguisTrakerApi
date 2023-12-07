const mysql = require("mysql2/promise"); // Importar la versión de Promesas de mysql2
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD
});

const getConnection = async () => {
    console.log("Conexion exitosa")
    const connection = await pool.getConnection();
    return connection;
};

const closeConnection = (connection) => {
    connection.release(); // Liberar la conexión para devolverla al pool
    console.log("Conexión cerrada");
};

module.exports = {
    getConnection,
    closeConnection
};
