import pool from "./db.js";
export async function createUser({ name, email, password_hash }) {
  const [result] = await pool.execute(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    [name, email, password_hash]
  );
  return { id: result.insertId, name, email };
}

export async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, username AS name, email, password_hash FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}

export async function findUserById(id) {
  const [rows] = await pool.execute(
    "SELECT id, username AS name, email FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
}
