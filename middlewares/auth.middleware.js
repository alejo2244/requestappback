const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded; // Puedes usar esto para verificar roles o IDs
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;