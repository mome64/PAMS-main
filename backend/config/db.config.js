const mysql = require("mysql2/promise");

const dbConfig = {
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(dbConfig);

// No need for getConnection, as mysql2/promise manages connections for you

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

module.exports = { query };
