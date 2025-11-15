import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("MySQL Connected as:", process.env.MYSQL_USER);
    conn.release();
  } catch (err) {
    console.log("MySQL Connection Failed:", err.message);
  }
})();

export default pool;
