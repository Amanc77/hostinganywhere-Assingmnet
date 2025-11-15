import pool from "../models/db.js";
import redis from "../utils/redis.js";

export const getMe = async (req, res) => {
  try {
    const key = `user:${req.userId}`;

    const cached = await redis.get(key);

    if (cached) {
      return res.json({ success: true, user: JSON.parse(cached) });
    }

    const [rows] = await pool.query(
      "SELECT id, username, email, full_name, phone FROM users WHERE id=?",
      [req.userId]
    );

    const user = rows[0];
    await redis.set(key, JSON.stringify(user));

    res.json({ success: true, user });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { username, fullName, phone } = req.body;

    await pool.query(
      "UPDATE users SET username = COALESCE(?, username), full_name = COALESCE(?, full_name), phone = COALESCE(?, phone) WHERE id = ?",
      [username ?? null, fullName ?? null, phone ?? null, req.userId]
    );

    const [rows] = await pool.query(
      "SELECT id, username, email, full_name, phone FROM users WHERE id = ?",
      [req.userId]
    );

    const updated = rows[0];
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const key = `user:${req.userId}`;
    await redis.set(key, JSON.stringify(updated), { EX: 3600 }); // TTL 1 hour

    return res.json({ success: true, user: updated });
  } catch (err) {
    console.error("updateMe error", err);
    return res.status(500).json({ success: false });
  }
};
