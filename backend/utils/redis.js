import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

client.on("error", (err) => console.error("Redis Error:", err));

await client.connect();
export default client;
