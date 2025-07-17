const { Alchemy, Network } = require('alchemy-sdk');
const priceQueue = require('../jobs/priceQueue'); // ✅ BullMQ queue instance

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

// ✅ POST /api/schedule
const schedulePriceFetch = async (req, res) => {
  try {
    const { token, network } = req.body;

    if (!token || !network) {
      return res.status(400).json({ error: 'Missing token or network' });
    }

    // Optionally: validate token format or resolve metadata here with Alchemy
    console.log('📅 Queueing job for full price history:', token, network);

    // ✅ Add job to queue
    await priceQueue.add('fetch-prices', { token, network });

    res.json({ message: '🟢 Job scheduled for full price history' });
  } catch (err) {
    console.error('❌ Error scheduling job:', err.message);
    res.status(500).json({ error: 'Failed to schedule price fetch' });
  }
};

module.exports = { schedulePriceFetch };
