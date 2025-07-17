// server/redisClient.js
require('dotenv').config();
const fetch = require('node-fetch');

const baseURL = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!baseURL || !token) {
  console.error('❌ Missing Redis ENV vars (UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN)');
}

const redis = {
  async set(key, value) {
    try {
      const safeKey = encodeURIComponent(key);
      const safeValue = encodeURIComponent(value);
      const url = `${baseURL}/set/${safeKey}/${safeValue}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      console.log(`🔍 Redis .set response for ${key}:`, text);
      const data = JSON.parse(text);
      return data;
    } catch (err) {
      console.error('❌ Redis REST .set error:', err.message);
    }
  },

  async get(key) {
    try {
      const safeKey = encodeURIComponent(key);
      const url = `${baseURL}/get/${safeKey}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      console.log(`🔍 Redis .get response for ${key}:`, text);
      const data = JSON.parse(text);
      return data.result;
    } catch (err) {
      console.error('❌ Redis REST .get error:', err.message);
    }
  }
};

console.log('✅ Redis (REST via fetch) initialized');
console.log('🧪 RedisClient export keys:', Object.keys(redis)); // Debug keys

module.exports = redis;
