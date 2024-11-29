const User = require('../models/user.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password, role, contactNo, address, city, profileImage } = req.body;
            console.log(req.body);
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword, role, contactNo, address, city, profileImage });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    verifyOTP: async (req, res) => {
        const { email, otp } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            if (user.otp === otp) {
                await User.update({ isVerified: true, otp: null }, { where: { email } });

                const user = await User.findOne({ where: { email } });

                const token = jwt.sign({ email, id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

                res.header(process.env.JWT_TOKEN_HEADER, token);

                return res.status(200).json({
                    status: true,
                    message: "Email verified successfully.",
                    token,
                    user
                });
            } else {
                return res.status(400).json({ error: "Invalid OTP" });
            }
        } catch (error) {
            console.error("Error during OTP verification", error);
            return res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    },
    sendResetPasswordOtp: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const otp = generateOTP();
            const otpExpires = Date.now() + 20 * 60 * 1000; // 20 minutes from now

            await User.update({ otp, otpExpires }, { where: { email } });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset OTP',
                text: `Your OTP for password reset is: ${otp}`
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ status: true, message: "New OTP sent to email." });
        } catch (error) {
            console.error("Error sending OTP for password reset", error);
            return res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    },
    verifyResetOtp: async (req, res) => {
        const { email, otp } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            if (user.otp === otp && user.otpExpires > Date.now()) {
                const resetToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
                return res.status(200).json({ status: true, message: "OTP verified for reset.", resetToken });
            } else {
                return res.status(400).json({ error: "Invalid or expired OTP" });
            }
        } catch (error) {
            console.error("Error during OTP verification for reset", error);
            return res.status(500).json({ status: false, error: "Internal Server Error" });
        }
    },
    resetPassword: async (req, res) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log("Token from swagger", token)
        try {
            const user = await User.findOne({ where: { email: req.user.email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const { newPassword } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword, salt);

            await User.update({ password: hash }, { where: { id: user.id } });
            return res.status(200).json({ status: true, message: "Password reset successful." });
        } catch (error) {
            console.error("Error while resetting password", error);
            return res.status(401).json({ status: false, error: "Invalid or expired token" });
        }
    },
    updatePassword: async (req, res) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findOne({ where: { email: decoded.email } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const { currentPassword, newPassword } = req.body;
            const match = await bcrypt.compare(currentPassword, user.password);
            if (!match) {
                return res.status(401).json({ error: "Invalid current password" });
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword, salt);
            await User.update({ password: hash }, { where: { email: user.email } });
            return res.status(200).json({ status: true, message: "Password updated successfully" });
        } catch (error) {
            console.error("Error while updating password", error);
            return res.status(500).json({ status: false, error: "Invalid or expired token" });
        }
    }
};

module.exports = userController;