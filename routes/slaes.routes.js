const express = require('express');
const { insertDummySales, getTotalSalesByCategory } = require('../controllers/sales.controller');
const router = express.Router();

router.get('/insert',insertDummySales);
router.get('/aggregate',getTotalSalesByCategory);


module.exports = router;