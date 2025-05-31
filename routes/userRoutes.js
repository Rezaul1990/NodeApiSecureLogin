const express = require('express');
const { registerUser, loginUser, getDashboard } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', verifyToken, getDashboard);

module.exports = router;
