const TokenPrice = require('../models/TokenPrice');
const redis = require('../redisClient'); // ✅ updated
const { JsonRpcProvider } = require('ethers');
const getAlchemyRpc = require('../utils/getAlchemyRpc');

const interpolate = (ts, ts0, p0, ts1, p1) => {
  const ratio = (ts - ts0) / (ts1 - ts0);
  return p0 + (p1 - p0) * ratio;
};

const getPrice = async (req, res) => {
  try {
    let { token, network, timestamp } = req.body;
    timestamp = Number(timestamp);

    if (!token || !network || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const rpcUrl = getAlchemyRpc(network);
    const provider = new JsonRpcProvider(rpcUrl);

    const cacheKey = `${token}:${network}:${timestamp}`;
    const cached = await redis.get(cacheKey);
    if (cached) return res.json({ price: parseFloat(cached), source: "cache" });

    const exact = await TokenPrice.findOne({ token, network, timestamp });
    if (exact) {
      await redis.set(cacheKey, exact.price.toFixed(4));
      return res.json({ price: exact.price, source: "db" });
    }

    const before = await TokenPrice.find({ token, network, timestamp: { $lt: timestamp } })
      .sort({ timestamp: -1 }).limit(1);
    const after = await TokenPrice.find({ token, network, timestamp: { $gt: timestamp } })
      .sort({ timestamp: 1 }).limit(1);

    if (!before.length || !after.length) {
      return res.status(404).json({ error: "Cannot interpolate" });
    }

    const ts0 = before[0].timestamp;
    const ts1 = after[0].timestamp;
    const p0 = before[0].price;
    const p1 = after[0].price;

    const interpolated = interpolate(timestamp, ts0, p0, ts1, p1);
    await redis.set(cacheKey, interpolated.toFixed(4));

    return res.json({ price: parseFloat(interpolated.toFixed(4)), source: "interpolated" });

  } catch (err) {
    console.error("❌ Error in /price:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getPrice };
