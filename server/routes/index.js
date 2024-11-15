const express = require('express');
const router = express.Router();

// Import individual route modules
const authRoutes = require('./authRoutes');
const fileRoutes = require('./fileRoutes');

// Use route modules
router.use('/auth', authRoutes);
router.use('/files', fileRoutes);

module.exports = router;
