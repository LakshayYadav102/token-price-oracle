# 🧠 Token Price Oracle

A decentralized utility to **fetch historical token prices** and **schedule full price histories** for ERC-20 tokens on **Ethereum** and **Polygon**. Useful for **DeFi analytics**, **dApps**, and **smart contracts** that rely on verifiable price data at specific past timestamps.

🌐 **Live Demo**: https://token-oracle-frontend.onrender.com

---

## 🚀 Features

- 🔍 **Query Historical Price**
  - Input: Token address, network (Ethereum / Polygon), and timestamp
  - Output: Exact or interpolated token price (in USD)

- 📅 **Schedule Full Price History**
  - Automatically fetches and stores daily token prices from the token's deployment date to the current date

- ⚡ **Fast Redis Caching** to avoid redundant API calls
- 🔐 **Secure Backend** using environment variables
- 🧩 **Modular Codebase** — easily extendable to other chains or tokens

---

## 🛠️ Tech Stack

### 🔷 Frontend — [`/client`](./client)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Data Fetching**: Axios

### 🔶 Backend — [`/`](./)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Blockchain Interaction**: Ethers.js
- **Caching**: Redis (Upstash REST API)
- **API Integration**: CoinGecko, Etherscan, Polygonscan
- **Utilities**: dotenv, morgan, cors

---

## 📦 APIs & Tools Used

- 🧪 **CoinGecko API** — for fetching token price data
- ⛓️ **Etherscan & Polygonscan APIs** — for determining token deployment timestamp
- ⚡ **Upstash Redis** — for serverless caching via REST
- 🔐 **dotenv** — for managing secrets securely

---

## 🌐 Supported Networks

- Ethereum Mainnet
- Polygon Mainnet

✅ Easily extendable to other EVM-compatible chains

---

## 🧠 Price Worker Script

To fetch and save full token price history (from creation to today), run the worker manually:

```bash
node priceWorker.js

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
