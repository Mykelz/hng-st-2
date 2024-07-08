const express = require('express');
const userController = require('../controllers/user');
const userValidation = require('../validation/userValidator')

const router = express.Router();

// /POST/auth/signup
router.post('/register', userValidation, userController.registerUser);

// /POST/auth/signup
router.post('/login', userController.loginUser);




module.exports = router;