import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";

import userRoutes from "./routes/user.route.js";
import planRoutes from "./routes/plans.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);
app.use("/api/plans", planRoutes);

app.get("/", (req, res) => {
  res.send("HostingAnywhere Backend Running");
});

app.listen(process.env.PORT, () =>
  console.log("Server running on", process.env.PORT)
);
