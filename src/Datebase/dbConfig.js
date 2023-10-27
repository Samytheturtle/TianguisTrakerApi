import mysql from "promise-mysql";
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD

});

const getConnection = () => {
    console.log('conexion exitosa con la bd')
    return connection;
};

module.exports = {
    getConnection
};