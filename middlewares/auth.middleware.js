const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const protect = async (req, res, next) => {

    try {
        let token;
        if (req.headers.authorization || req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];

        }
        if (!token) return res.status(401).json({ message: "Not authorized!" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message:error.message
        })
    }
}

const authorize = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
    res.status(403).json({
                message:"Access denied!"
            });
        }
    }
    next();

}

module.exports = {protect, authorize}