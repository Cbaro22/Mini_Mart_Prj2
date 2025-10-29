import jwt from 'jsonwebtoken';
import User from '../modules/userModule.js';

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user  && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Admin only' });
};
