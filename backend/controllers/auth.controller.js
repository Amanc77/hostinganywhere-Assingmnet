import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../models/db.js";
import redis from "../utils/redis.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName = null } = req.body;

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "Email exists" });
    }
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, email, password_hash, full_name) VALUES (?,?,?,?)",
      [username, email, hash, fullName]
    );

    res.json({ success: true, message: "User registered" });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const user = userRows[0];
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(400).json({ success: false, message: "Invalid" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.token;
    if (token) await redis.set(`bl:${token}`, "1", { EX: 604800 });

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};
