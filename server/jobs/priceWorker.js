const { Worker } = require('bullmq');
const mongoose = require('mongoose');
const TokenPrice = require('../models/TokenPrice');
const { fetchHistoricalPrice } = require('../utils/fetchHistoricalPrice');
const redis = require('../redisClient.js');
const { JsonRpcProvider } = require('ethers'); // ✅ Make sure this is from ethers
const getAlchemyRpc = require('../utils/getAlchemyRpc');
const { Alchemy, Network } = require('alchemy-sdk');
const connection = require('./bullmqRedis');
require('dotenv').config();

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Worker connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ⏳ Delay utility
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 📅 Format date to YYYY-MM-DD
function formatDate(d) {
  return d.toISOString().split('T')[0];
}

// 🧠 BullMQ Worker
const worker = new Worker('price-history', async job => {
  const { token, network } = job.data;

  // 🔍 Log job input
  console.log(`🔍 Running job for token: ${token}, network: ${network}`);

  // ✅ Initialize Alchemy SDK with dynamic network
  const alchemy = new Alchemy({
    apiKey: process.env.ALCHEMY_API_KEY,
    network: network === 'polygon' ? Network.MATIC_MAINNET : Network.ETH_MAINNET,
  });

  // ✅ Dynamic Alchemy RPC using ethers
  const rpcUrl = getAlchemyRpc(network);
  const provider = new JsonRpcProvider(rpcUrl);

  try {
    // 🕵️ Get the token's first transfer (to estimate creation date)
    const firstTx = await alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',
      category: ['erc20'],
      contractAddresses: [token],
      order: 'asc',
      maxCount: 1,
      withMetadata: true,
    });

    // 🪵 Debug log the raw transfers
    console.log('📦 Transfers from Alchemy:', JSON.stringify(firstTx.transfers, null, 2));

    if (!firstTx.transfers.length) throw new Error('Token creation date not found');

    let createdAt = new Date(firstTx.transfers[0].metadata.blockTimestamp);
    const today = new Date();

    // ⏳ Limit to 1 year for CoinGecko
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    if (createdAt < oneYearAgo) createdAt = oneYearAgo;

    let current = new Date(createdAt);

    while (current <= today) {
      const dateStr = formatDate(current);
      const unix = Math.floor(current.getTime() / 1000);
      const cacheKey = `${token}:${network}:${unix}`;

      try {
        const price = await fetchHistoricalPrice(token, current, network);

        if (price) {
          await TokenPrice.create({ token, network, date: dateStr, timestamp: unix, price });
          await redis.set(cacheKey, price.toFixed(3));
          console.log(`✅ [${token}] ${dateStr}: $${price}`);
        } else {
          console.warn(`⚠️ [${token}] ${dateStr}: No price returned`);
        }
      } catch (err) {
        console.warn(`⚠️ Failed on ${dateStr}:`, err.message);
      }

      current.setDate(current.getDate() + 1);
      await delay(1200); // ⏳ Respect rate limit
    }

  } catch (err) {
    console.error('❌ Worker job failed:', err.message);
  }
}, { connection, concurrency: 10 });

// ✅ Events
worker.on('completed', job => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});
