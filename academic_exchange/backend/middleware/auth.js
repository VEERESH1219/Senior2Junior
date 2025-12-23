const jwt = require('jsonwebtoken');

function protect(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer token"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'testsecret');
    req.user = decoded; // { id, name, email, isAdmin }
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalid' });
  }
}

module.exports = protect;
