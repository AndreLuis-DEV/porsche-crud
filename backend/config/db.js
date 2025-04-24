//porsche-crud/backend/config/db.js

// Importa o módulo mysql2/promise para interação assíncrona com MySQL
const mysql = require('mysql2/promise');
// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// Pool de conexões com o banco de dados MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'porsche_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exporta o pool de conexões para ser utilizado em outros módulos
module.exports = pool;