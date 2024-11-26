const userRouter = require('express').Router();
const userController = require('../controllers/user.Controller');

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);

module.exports = userRouter;