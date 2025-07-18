import axios from 'axios';

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE ||
    (typeof window !== 'undefined' && window.location.hostname.includes('localhost')
      ? 'http://localhost:5000/api'
      : 'https://token-price-api.onrender.com/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
