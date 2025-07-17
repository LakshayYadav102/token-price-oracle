'use client';
import { useState } from 'react';
import API from '../utils/api';

interface TokenPriceRequest {
  token: string;
  network: 'ethereum' | 'polygon';
  timestamp: number;
}

interface TokenFormProps {
  onResult: (data: { price?: number; source?: string; error?: string }) => void;
}

export default function TokenForm({ onResult }: TokenFormProps) {
  const [form, setForm] = useState<TokenPriceRequest>({
    token: '',
    network: 'ethereum',
    timestamp: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('/price', form);
      onResult(res.data);
    } catch {
      onResult({ error: 'Invalid request or token not indexed yet.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        placeholder="Token Address"
        className="w-full p-2 border"
        value={form.token}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm({ ...form, token: e.target.value })
        }
      />
      <select
        className="w-full p-2 border"
        value={form.network}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setForm({ ...form, network: e.target.value as 'ethereum' | 'polygon' })
        }
      >
        <option value="ethereum">Ethereum</option>
        <option value="polygon">Polygon</option>
      </select>
      <input
        type="number"
        placeholder="Unix Timestamp"
        className="w-full p-2 border"
        value={form.timestamp}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm({ ...form, timestamp: Number(e.target.value) })
        }
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
        Get Price
      </button>
    </form>
  );
}
