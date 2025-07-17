const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const priceRoutes = require('./routes/priceRoutes');
//const scheduleRoutes = require('./routes/scheduleRoutes');
const { redis } = require('./redisClient');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API Routes
//app.use('/api', priceRoutes);
//app.use('/api', scheduleRoutes);
app.use('/api', apiRoutes); // ✅ Only this

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Health Check
app.get('/', async (req, res) => {
  try {
    await redis.set('health-check', 'ok', 'EX', 30);
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
