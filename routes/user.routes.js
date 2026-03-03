const express = require("express");

const {protect,authorize} = require("../middlewares/auth.middleware.js");
const router = express.Router();


router.get('/me',protect,(req, res)=>{
    res.json({
     message:"profile",
    user: req.user
    })
})


module.exports = router