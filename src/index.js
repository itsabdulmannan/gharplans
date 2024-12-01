const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

//Swagger Setup
const setupSwaggger = require('./config/swqgger');
setupSwaggger(app);

//Association and Seeder
require('./models/associations.Model');
const createAdminUser = require('./seed/seed');

// Middleware for serving static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Middleware for parsing incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', require('./routes/user.Route'));
app.use('/image', require('./routes/image.Route'));
app.use('/category', require('./routes/category.Route'));
app.use('/product', require('./routes/products.Route'));
app.use('/reviews', require('./routes/review.Route'));
app.use('/cart', require('./routes/cart.Route'));
app.use('/orders', require('./routes/order.Route'));

// Start the server
app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    try {
        await createAdminUser();
    } catch (error) {
        console.error("Error creating admin user:", error);
    }
});