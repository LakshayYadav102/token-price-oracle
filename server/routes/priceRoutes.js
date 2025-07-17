const express = require('express');
const router = express.Router();
const { getPrice } = require('../controllers/priceController');
const { schedulePriceFetch } = require('../controllers/scheduleController');

router.post('/price', getPrice);       // ✅ With interpolation
router.post('/schedule', schedulePriceFetch); // ✅ Full price history

module.exports = router;
