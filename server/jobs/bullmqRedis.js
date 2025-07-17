// server/jobs/connection.js
const IORedis = require('ioredis');
require('dotenv').config();

const redisConnection = new IORedis({
  host: 'legible-sparrow-58638.upstash.io',
  port: 6379,
  password: process.env.UPSTASH_REDIS_REST_TOKEN,
  tls: {}, // Ensures TLS encryption (required by Upstash)
  maxRetriesPerRequest: null,
  reconnectOnError: (err) => {
    if (err.message.includes("READONLY")) {
      console.warn("🔁 Reconnecting on READONLY error...");
      return true;
    }
    return false;
  },
});

console.log('✅ Redis (BullMQ) initialized');
module.exports = redisConnection;
