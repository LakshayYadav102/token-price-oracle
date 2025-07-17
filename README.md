# 🧠 Token Price Oracle

A decentralized utility that allows users to query **historical token prices** (based on block timestamps) and **schedule complete price histories** of any ERC20 token on Ethereum or Polygon. Built using a modern full-stack architecture, this tool is essential for DeFi analytics, dApps, or smart contracts that depend on verifiable past prices.

---

## 🚀 Features

- 🔍 **Fetch Historical Price** of any ERC20 token by:
  - Token address
  - Blockchain network (Ethereum / Polygon)
  - Timestamp
  - Output: Exact or interpolated price (USD)

- 📅 **Schedule Full History**:
  - Automatically fetch and store daily historical prices from token creation to current day

- ⚡ **Fast Caching** using Redis
- 🛡️ **Secure API** with environment variables
- 📦 **Modular architecture** for easy expansion

---

## 🛠️ Tech Stack

### **Frontend** — [`/client`](./client)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **API Handling**: Axios

### **Backend** — [`/`](./)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Caching**: Redis (via Upstash REST)
- **Utilities**: Ethers.js, dotenv, axios
- **CORS & Logging**: CORS, Morgan

---

## 🌐 Supported Networks

- Ethereum Mainnet
- Polygon Mainnet

*(Easily extendable to other EVM chains)*

---

## 📦 APIs & Tools Used

- 🧪 **CoinGecko API** — for price data
- 🧠 **Etherscan & Polygonscan APIs** — for token deployment timestamp
- ⚡ **Upstash Redis** — for serverless caching (REST mode)
- 🔐 **dotenv** — for securely managing API keys

---

## 🔒 Environment Variables

Add a `.env` file at root with the following:

```env
PORT=5000
REDIS_URL=your_upstash_redis_url
COINGECKO_API_KEY=your_api_key (if required)
ETHERSCAN_API_KEY=your_key
POLYGONSCAN_API_KEY=your_key
Also include a separate .env in /client if needed.

🧪 Running Locally
Backend:
npm install
npm start
Frontend (client):
cd client
npm install
npm run dev
🧼 .gitignore Highlights
gitignore
.env
node_modules/
client/.next/
client/node_modules/

🤝 Contributors
Lakshay Yadav — Full-Stack Developer
GitHub • LinkedIn
