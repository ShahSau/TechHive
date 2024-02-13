import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  
    try {
      const token = req.headers.authorization;
      if (!token) return next(errorHandler(401, 'Unauthorized'))
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      next(errorHandler(403, 'Forbidden'));
    }
};

