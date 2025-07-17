// testRedis.js
const Redis = require('ioredis');

const client = new Redis({
  host: 'legible-sparrow-58638.upstash.io',
  port: 6379,
  password: 'AeUOAAIjcDEyNzkyYWNiY2E1ZjM0MzRkODQ3Y2QwOGNlYzQ2NjQ1MnAxMA',
  tls: {},
  maxRetriesPerRequest: null
});

client.on('ready', () => console.log('✅ Ready'));
client.on('error', (err) => console.error('❌ Redis Error:', err));

client.get('test').then(console.log);
