const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
router.use('/auth/v1/', authRoutes);

const userRoutes = require('./user.route');
router.use('/api/v1/users', userRoutes);

module.exports = router;
