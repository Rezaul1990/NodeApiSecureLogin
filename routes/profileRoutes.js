const express = require('express');
const router = express.Router();
const { createProfile, getProfileByUsername } = require('../controllers/profileController');
const {verifyToken} = require('../middleware/authMiddleware');
// ✅ Protected route - requires token
router.post('/profile', verifyToken, createProfile);

// ✅ Public route - no token required
router.get('/profile/:username', getProfileByUsername);

module.exports = router;
