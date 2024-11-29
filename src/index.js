const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const setupSwaggger = require('./config/swqgger');
setupSwaggger(app);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', require('./routes/user.Route'));
app.use('/image', require('./routes/image.Route'));
app.use('/category', require('./routes/category.Route'));
app.use('/product', require('./routes/products.Route'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); 