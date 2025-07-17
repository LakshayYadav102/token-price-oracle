const axios = require("axios");
require("dotenv").config(); // ⬅️ ensures .env is loaded

// ✅ Known tokens — you can expand this list
const tokenMap = {
  ethereum: {
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'usd-coin', // USDC (Ethereum)
    '0x6b175474e89094c44da98b954eedeac495271d0f': 'dai',      // DAI
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': 'uniswap',  // UNI
  },
  polygon: {
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174': 'usd-coin', // USDC (Polygon)
    '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063': 'dai',      // DAI (Polygon)
    '0xb33eaad8d922b1083446dc23f610c2567fb5180f': 'uniswap',  // UNI (Polygon)
  }
};

// 🔁 Delay helper for retries
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 🔎 1. Date check for CoinGecko free plan
function isWithinOneYear(date) {
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  return new Date(date) >= oneYearAgo;
}

// 🔁 2. Retry with rate limit handling
async function fetchWithRetry(url, params, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const fullParams = {
        ...params,
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY, // ✅ query param style
      };

      const res = await axios.get(url, { params: fullParams });
      return res.data;
    } catch (err) {
      const status = err.response?.status;
      if (status === 429 && i < retries - 1) {
        console.warn(`⏳ Rate limited by CoinGecko. Retrying (${i + 1})...`);
        await delay(1500 * (i + 1));
      } else {
        console.error(`❌ Coingecko fetch error: ${status || err.message}`);
        return null;
      }
    }
  }
}

// 📅 Format date as dd-mm-yyyy
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

async function fetchHistoricalPrice(tokenAddress, date, network = 'ethereum') {
  const tokenId = tokenMap[network]?.[tokenAddress.toLowerCase()];
  if (!tokenId) {
    console.warn(`⚠️ Unknown token on ${network}: ${tokenAddress}`);
    return null;
  }

  // 🔁 Skip old dates
  if (!isWithinOneYear(date)) {
    console.warn(`🚫 Date ${date} is beyond 1 year. Skipping (CoinGecko free plan limit).`);
    return null;
  }

  const formattedDate = formatDate(date);
  const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/history`;

  const data = await fetchWithRetry(url, { date: formattedDate });
  const price = data?.market_data?.current_price?.usd;

  return price ?? null;
}


module.exports = { fetchHistoricalPrice };
