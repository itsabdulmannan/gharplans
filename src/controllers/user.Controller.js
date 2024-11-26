const User = require('../models/user.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password, role, contactNo, address, city, image } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword, role, contactNo, address, city, image });
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
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController;