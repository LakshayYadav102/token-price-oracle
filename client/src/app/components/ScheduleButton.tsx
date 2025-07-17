'use client';
import { useState } from 'react';
import API from '../utils/api';
import { ScheduleRequest } from '../types';

export default function ScheduleButton() {
  const [form, setForm] = useState<ScheduleRequest>({
    token: '',
    network: 'ethereum',
  });

  const [msg, setMsg] = useState('');

  const handleClick = async () => {
    try {
      const res = await API.post('/schedule', form);
      setMsg(res.data.message);
    } catch {
      setMsg('❌ Error scheduling job.');
    }
  };

  return (
    <div className="mt-6 p-4 border">
      <input className="w-full p-2 border" placeholder="Token Address"
        value={form.token} onChange={(e) => setForm({ ...form, token: e.target.value })} />
      <select className="w-full p-2 border mt-2"
        value={form.network} onChange={(e) => setForm({ ...form, network: e.target.value as 'ethereum' | 'polygon' })}>
        <option value="ethereum">Ethereum</option>
        <option value="polygon">Polygon</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 mt-3 rounded" onClick={handleClick}>
        📅 Schedule Full History
      </button>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  );
}
