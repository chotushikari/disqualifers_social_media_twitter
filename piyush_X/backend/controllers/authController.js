const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Incoming Payload:', req.body); // Debugging

  if (!username || !email || !password) {
    console.log('Validation Failed'); // Debugging
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error during registration:', error); // Log the full error
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email or username already exists.' });
    }
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};