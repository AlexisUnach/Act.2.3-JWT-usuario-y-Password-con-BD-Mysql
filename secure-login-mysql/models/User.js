// models/User.js
const mysql = require('mysql2/promise');

// Crear pool de conexiones (mejor que conexión única)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Funciones para interactuar con la tabla users
const User = {
  // Buscar usuario por email
  findByEmail: async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  // Crear nuevo usuario
  create: async (name, email, passwordHash) => {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );
    return { id: result.insertId, name, email };
  },

  // Obtener pool (opcional, para debugging)
  getPool: () => pool
};

module.exports = User;