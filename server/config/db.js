// server/config/db.js
// =========================================================
// MySQL Database Connection using mysql2 promise-based API
// =========================================================

const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool (more efficient than single connections)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rm_collection',
  waitForConnections: true,
  connectionLimit: 10,      // Max simultaneous connections
  queueLimit: 0             // Unlimited queue
});

// Test connection on startup
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // Stop the server if DB is unreachable
  }
}

testConnection();

module.exports = pool;
