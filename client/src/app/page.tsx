'use client';
import { useState } from 'react';

const TOKEN_MAP = {
  USDC: {
    ethereum: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    polygon: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  },
  DAI: {
    ethereum: '0x6b175474e89094c44da98b954eedeac495271d0f',
    polygon: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
  },
  UNI: {
    ethereum: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    polygon: '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
  },
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api';

export default function Home() {
  const [token, setToken] = useState<'USDC' | 'DAI' | 'UNI'>('USDC');
  const [network, setNetwork] = useState<'ethereum' | 'polygon'>('ethereum');
  const [date, setDate] = useState('');
  const [priceInfo, setPriceInfo] = useState<{ price: number; source: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const getUnixTimestamp = (dateStr: string) =>
    Math.floor(new Date(dateStr).getTime() / 1000);

  const fetchPrice = async () => {
    if (!date) return alert('Please select a date');
    setLoading(true);

    const tokenAddress = TOKEN_MAP[token][network];

    const res = await fetch(`${API_BASE}/price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: tokenAddress,
        network,
        timestamp: getUnixTimestamp(date),
      }),
    });

    const data = await res.json();
    setLoading(false);
    setPriceInfo(data);
  };

  const scheduleHistory = async () => {
    setDate('');
    const tokenAddress = TOKEN_MAP[token][network];

    const res = await fetch(`${API_BASE}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: tokenAddress,
        network,
      }),
    });

    const data = await res.json();
    alert(data.message || 'Scheduled');
  };

  return (
    <main 
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1620336655055-bd00c24f0b63?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-indigo-900/90 backdrop-blur-sm" />
      
      <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-xl space-y-6 border border-indigo-500/30 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm1-9a1 1 0 10-2 0v4a1 1 0 00.293.707l2 2a1 1 0 001.414-1.414L11 9.586V7z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
            Token Price Oracle
          </h1>
          <p className="text-gray-300">Retrieve historical token prices with blockchain precision</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">Select Token</label>
            <div className="relative">
              <select
                value={token}
                onChange={(e) => setToken(e.target.value as 'USDC' | 'DAI' | 'UNI')}
                className="w-full bg-gray-800/70 border border-gray-700 rounded-xl px-4 py-3 shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-200 appearance-none"
              >
                {Object.keys(TOKEN_MAP).map((key) => (
                  <option key={key} value={key} className="bg-gray-800 text-gray-200">{key}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Network</label>
              <div className="relative">
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value as 'ethereum' | 'polygon')}
                  className="w-full bg-gray-800/70 border border-gray-700 rounded-xl px-4 py-3 shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-200 appearance-none"
                >
                  <option value="ethereum" className="bg-gray-800 text-gray-200">Ethereum</option>
                  <option value="polygon" className="bg-gray-800 text-gray-200">Polygon</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-800/70 border border-gray-700 rounded-xl px-4 py-3 shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-200"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={fetchPrice}
            disabled={loading}
            className={`flex items-center justify-center w-full px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 ${
              loading 
                ? 'bg-emerald-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 hover:shadow-emerald-500/30'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Fetching...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Get Price
              </>
            )}
          </button>

          <button
            onClick={scheduleHistory}
            className="flex items-center justify-center w-full px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Schedule History
          </button>
        </div>

        {priceInfo && (
          <div className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900/80 p-5 rounded-2xl border border-emerald-500/30 shadow-lg">
            <div className="flex items-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold text-emerald-400">Price Information</h3>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              ${priceInfo.price.toFixed(4)}
            </p>
            <div className="flex items-center text-sm text-gray-400 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Source: <code className="bg-gray-800/50 px-2 py-1 rounded ml-1">{priceInfo.source}</code></span>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-800">
          <p className="text-center text-sm text-gray-500">
            Powered by blockchain oracle technology • Real-time historical data
          </p>
        </div>
      </div>
    </main>
  );
}