const User = require('../models/user.Model')
const bcrypt = require('bcrypt')

const createAdminUser = async () => {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            console.log('Admin user already exists.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hash,
            role: 'admin',
            isVerified: true
        });

        console.log('Admin user created successfully:', newUser);
    } catch (error) {
        console.error("Error while creating admin user", error);
    }
};

module.exports = createAdminUser