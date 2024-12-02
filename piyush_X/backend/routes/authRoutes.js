const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json(user);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Email or username already exists.' });
      }
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });// User registration
router.post('/login', login);       // User login
const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
module.exports = router;