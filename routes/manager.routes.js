const express = require('express');
const { protect, authorize } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/dashboard', protect, authorize("Manager", "Admin"),(req, res)=>{
    res.json({
        message:"Welcome to Manager Dashboard"
    })
})

module.exports = router