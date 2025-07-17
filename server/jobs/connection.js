// bullmqRedis.js
const IORedis = require('ioredis');
require('dotenv').config();

const redisConnection = new IORedis(process.env.REDIS_BULLMQ_URL, {
  maxRetriesPerRequest: null,
});

console.log('✅ Redis (BullMQ) initialized');
module.exports = redisConnection;
