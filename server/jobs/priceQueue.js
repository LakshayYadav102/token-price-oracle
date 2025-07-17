// server/jobs/priceQueue.js
const { Queue } = require('bullmq');
const connection = require('./bullmqRedis');

const priceQueue = new Queue('price-history', { connection });

module.exports = priceQueue;
