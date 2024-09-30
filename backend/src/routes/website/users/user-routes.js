const express = require('express');
const { registerUser, loginUser } = require('../../../controller/controller');
// const { registerUser } = require('../../../controllers/controllers');

const userRouter = express.Router();

userRouter.post('/register-user', registerUser);
userRouter.post('/login-user',loginUser);

module.exports = userRouter;