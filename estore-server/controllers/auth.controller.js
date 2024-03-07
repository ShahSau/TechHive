import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'
import Product from '../models/products.model.js'

export const signup = async (req, res, next) => {
  const { username, email, password, firstName, lastName, address } = req.body
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  })
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword, firstName, lastName, address })
  try {
    await newUser.save()
    res.status(201).json('User created successfully!')
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
      const validUser = await User.findOne({ email })
      if (!validUser) return next(errorHandler(404, 'User not found!'))
      const validPassword = bcryptjs.compareSync(password, validUser.password)
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'))
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      const { password: pass, ...rest } = validUser._doc
    
      res.status(200).json({ token, user: rest,expiresInSeconds: 3600})
    } catch (error) {
      next(error)
    }
}

export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token')
      res.status(200).json('User has been logged out!')
    } catch (error) {
      next(error)
    }
}


export const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
} catch (error) {
    res.status(400).json({ message: error.message });
}
}

export const blockUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if(user.role === 'admin'){
        return res.status(400).json({ message: "Admin cannot be blocked" });
    }
    if(user.blocked){
        return res.status(400).json({ message: "User is already blocked" });
    }
    user.blocked = true;
    await user.save();
    res.status(200).json({message:"User has been blocked"});
}catch (error) {
    res.status(400).json({ message: error.message });
}
}

export const unblockUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.blocked = false;
    await user.save();
    res.status(200).json({message:"User has been unblocked"});
}catch (error) {
    res.status(400).json({ message: error.message });
}
}

export const addToFavroute = async (req, res, next) => {
 
  try {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const user =  await User.find({ _id: decoded.id});
    if (user.length ===0 ) return next(errorHandler(404, 'User not found!'));
    if(user[0].favorites.includes(req.body.productId)) {
      return next(errorHandler(400, 'Product already in favroute'));
    }
    user[0].favorites.push(req.body.productId);
    await user[0].save();
    res.status(200).json({message:"Product has been added to favroute"});
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const removeFromFavroute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  const user =  await User.find({ _id: decoded.id});
  if (user.length ===0 ) {
    return next(errorHandler(404, 'User not found!'));
  }else{
    if(user[0].favorites.length === 0) {
      return next(errorHandler(404, 'No product in favroute'));
    }else{
      if(!user[0].favorites.includes(req.body.productId)) {
        return next(errorHandler(404, 'Product not found in favroute'));
      }else{
        user[0].favorites = user[0].favorites.filter((id) => id !== req.body.productId);
        await user[0].save();
        res.status(200).json({message:"Product has been removed from favroute"});
      }
    }
  }
}
catch (error) {
  res.status(400).json({ message: error.message });
}
}

export const getAllFavroute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const user =  await User.find({ _id: decoded.id});
    if (user.length ===0 ) return next(errorHandler(404, 'User not found!'));
    const products = await Product.find({ id: { $in: user[0].favorites } });
    console.log(products);
    res.status(200).json(products);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token);
    const user =  await User.find({ _id: decoded.id});
    if (user.length ===0 ) return next(errorHandler(404, 'User not found!'));

    if(req.body.password !== ''){
      const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    await User.findByIdAndUpdate(decoded.id, { $set: req.body });
    const updatedUser = await User.findById(decoded.id);
    res.status(200).json({message:"User has been updated", user: updatedUser});
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
}
