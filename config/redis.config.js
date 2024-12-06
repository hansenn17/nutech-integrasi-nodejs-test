const { createClient } = require("redis");

require("dotenv").config();

const redisClient = createClient({
  name: "nutech_integrasi_redis",
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) =>
  console.error("error connecting to redis:", err.message)
);
redisClient.on("connect", () => {
  console.info("connection to redis success");
});

redisClient.connect();

module.exports = redisClient;
