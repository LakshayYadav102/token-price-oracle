const express = require('express');
const router = express.Router();
const { getPrice } = require('../controllers/priceController');
const { schedulePriceFetch } = require('../controllers/scheduleController');

// 👇 Define both routes here
router.post('/price', getPrice);
router.post('/schedule', schedulePriceFetch);

module.exports = router;
