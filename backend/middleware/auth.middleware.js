import jwt from "jsonwebtoken";
import redis from "../utils/redis.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.cookies?.token;
    if (!authHeader) return res.status(401).json({ success: false });

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const blacklisted = await redis.get(`bl:${token}`);
    if (blacklisted) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.token = token;

    next();
  } catch (e) {
    return res.status(401).json({ success: false });
  }
};
