const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract the token after "Bearer"
  if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user info to the request
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid Token' });
  }
};