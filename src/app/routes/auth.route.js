const express = require('express');
const router = express.Router();

const authController = require('./../components/controllers/authController');
const authenticate = require('../components/my_modules/passport').authenticateJwt;  

router.post('/sign-in', authController.signIn);
router.post('/token', authenticate, authController.token);
     
module.exports = router;