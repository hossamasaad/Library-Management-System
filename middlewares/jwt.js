import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
  
    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, config.app.jwt_secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };
  
  
const authorizeUserTypes = (allowedUserTypes) => (req, res, next) => {
    if (!allowedUserTypes.includes(req.user.userType)) {
      return res.status(403).json({ message: 'Access Forbidden' });
    }
    next();
  };

export default { authenticateJWT, authorizeUserTypes }