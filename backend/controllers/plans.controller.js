import pool from "../models/db.js";
import redis from "../utils/redis.js";

export const getPlans = async (req, res) => {
  try {
    const cache = await redis.get("plans");
    if (cache) return res.json({ success: true, plans: JSON.parse(cache) });

    const [plans] = await pool.query(
      "SELECT id, name, price, description, features FROM plans"
    );

    // cache for 30 seconds as assignment requires
    await redis.set("plans", JSON.stringify(plans), { EX: 30 });

    res.json({ success: true, plans });
  } catch (e) {
    console.error("getPlans error:", e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
