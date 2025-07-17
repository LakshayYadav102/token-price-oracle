const express = require('express');
const router = express.Router();
const { schedulePriceFetch } = require('../controllers/scheduleController');

router.post('/schedule', schedulePriceFetch);

module.exports = router;
