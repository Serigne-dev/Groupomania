const mysql = require("mysql");

// Pool de conexion
const db = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: process.env.SQL_HOST,
    user: 'root',
    password: 'Serigne1*',
    database: 'Groupomania',
});

// Test de conexion
db.query("SELECT 1  AS solution", function (error, results, fields) {
    if (error) throw error;
    console.log("Connected successfully to MySQL DB !");
});

module.exports = db;