const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Request OTP
router.post('/request-otp', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Find or create user
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email });
        }

        // Generate OTP
        const otp = user.generateOTP();
        await user.save();

        // Send OTP email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Login OTP',
            text: `Your OTP for login is: ${otp}. This OTP will expire in 10 minutes.`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});

// Verify OTP and login
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValid = user.verifyOTP(otp);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Clear OTP after successful verification
        user.otp = undefined;
        user.isVerified = true;
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP' });
    }
});

module.exports = router; 