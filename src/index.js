const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/user.Route');
app.use('/user', userRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); 