// server/redisClient.js
require('dotenv').config();
const fetch = require('node-fetch');

const baseURL = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = {
  async set(key, value) {
    try {
      const safeKey = encodeURIComponent(key);
      const safeValue = encodeURIComponent(value);
      const res = await fetch(`${baseURL}/set/${safeKey}/${safeValue}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('❌ Redis REST .set error:', err.message);
    }
  },

  async get(key) {
    try {
      const safeKey = encodeURIComponent(key);
      const res = await fetch(`${baseURL}/get/${safeKey}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data.result;
    } catch (err) {
      console.error('❌ Redis REST .get error:', err.message);
    }
  }
};

console.log('✅ Redis (REST via fetch) initialized');
module.exports = redis;
