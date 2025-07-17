import { useState } from 'react';
import API from '../../utils/api';
import { usePriceStore } from '../../store/priceStore';

const PriceForm = () => {
  const [token, setToken] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [timestamp, setTimestamp] = useState('');
  const { setLoading, setResult } = usePriceStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/price', {
        token,
        network,
        timestamp: parseInt(timestamp)
      });
      setResult(res.data);
    } catch (err) {
      setResult({ error: 'Fetch failed' });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="input" type="text" placeholder="Token Address" value={token} onChange={(e) => setToken(e.target.value)} required />
      <select className="input" value={network} onChange={(e) => setNetwork(e.target.value)}>
        <option value="ethereum">Ethereum</option>
        <option value="polygon">Polygon</option>
      </select>
      <input className="input" type="number" placeholder="Timestamp (Unix)" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} required />
      <button type="submit" className="btn">Get Price</button>
    </form>
  );
};

export default PriceForm;
