import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import User from '../models/user.model.js';

export const verifyToken = (req, res, next) => {
  console.log("DDDDD",req.headers.authorization)
    try {
      const token = req.headers.authorization;
      if (!token) return next(errorHandler(401, 'Unauthorized'))
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      next(errorHandler(403, 'Forbidden'));
    }
};


export const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  const user =  await User.find({ _id: decoded.id});
  if (user.length ===0 ) return next(errorHandler(404, 'User not found!'));
  if (user[0].role !== 'admin') return next(errorHandler(403, 'Forbidden'));

  next()
}