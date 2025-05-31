const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register Controller
exports.registerUser = async (req, res) => {
  const { name, email, password, secret } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 10);
    const role = secret === process.env.ADMIN_CODE ? 'admin' : 'member';

    const user = new User({ name, email, password: hashedPw, role });
    await user.save();

    res.json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
};

// ✅ Login Controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      role: user.role,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// ✅ Dashboard Controller
exports.getDashboard = (req, res) => {
  const { role } = req.user;
  if (role === 'admin') {
    res.json({ message: 'Welcome Admin! You have full access.' });
  } else {
    res.json({ message: 'Welcome Member! Limited access.' });
  }
};
