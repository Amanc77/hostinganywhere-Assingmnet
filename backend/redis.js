import { createClient } from "redis";

const redisUrl = `redis://${process.env.REDIS_HOST || "127.0.0.1"}:${
  process.env.REDIS_PORT || 6379
}`;
const client = createClient({ url: redisUrl });

client.on("error", (err) => console.error("Redis Error:", err));
await client
  .connect()
  .catch((err) => console.error("Redis connect failed", err));

export default client;
