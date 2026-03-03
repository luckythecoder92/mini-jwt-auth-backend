const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {

        const { fullname, email, password, role } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields are requierd"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const allowedRoles = ["User", "Manager", "Admin"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: "Invalid role selected"
            });
        }

        const newUser = await User.create({
            fullname,
            email,
            password,
            role
        });
        const token = jwt.sign(
            {
                id: newUser._id,
                role: newUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(201).json({
            message: "User Registerd!",
            token,
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(
                {
                    message: "Email and password are required!"
                }
            )
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "invalid credentials!"
            })
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })
        const token = jwt.sign({
            id: user._id,
            role: user.role
        },
            process.env.JWT_SECRET,
            { expiresIn: '1d' });

        res.status(200).json({
            message: "Login successful",
            user:{
                   fullname: user.fullname,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied!"
            });
        }
        // user is authorized, continue to next middleware/handler
        next();
    }
}

module.exports = {
    registerUser,
    loginUser,
    authorize
}