// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const redis = require('./redisClient'); // ✅ Correct import — no destructuring

const apiRoutes = require('./routes/apiRoutes'); // ✅ Combined route

dotenv.config();

const app = express();

// ✅ Custom CORS Configuration — Allow specific domains
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://token-oracle-frontend.onrender.com'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// ✅ API Routes
app.use('/api', apiRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Health Check Route
app.get('/', async (req, res) => {
  try {
    await redis.set('health-check', 'ok');
    const value = await redis.get('health-check');
    res.send(`🚀 Token Oracle Backend Running — Redis says: ${value}`);
  } catch (err) {
    console.error('❌ Redis REST API error:', err.message);
    res.status(500).send('🚨 Redis Error');
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
