const express = require('express');
const router = express.Router();
const passport = require('passport')
const authController = require('./../components/controllers/authController');


router.post('/sign-in', authController.signIn);
router.post('/token', passport.authenticate('jwt', {session: false}), authController.token);
module.exports = router;