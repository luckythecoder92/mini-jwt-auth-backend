const express = require('express');
const {protect,authorize} = require('../middlewares/auth.middleware.js');
const router = express.Router();


router.get('/dashboard', protect,authorize("Admin"),(req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  })

module.exports = router