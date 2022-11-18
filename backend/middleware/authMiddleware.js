//middleware to check if user has the correct token

import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

//TODO: changing name to verifyToken, instead protect
const protect = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
    try {
    if (authorization && authorization.startsWith('Bearer')) {
      try {
        token = authorization.split(' ')[1];

        //GOAL: to get the payload, use id inside payload to fetch user. How? decode the token using jwt and the secret
        const decoded = jwt.verify(token, process.env.JSON_SECRET);

        //set the req.user, means: the all protected route has the prop of req.user
        //REVIEW: might want to include password-> allows user to update his password
        //check if possible without incl. -password
        //after REVIEW: possible to access req.user.password in other function
        //no change made. if(bug with change pass) possibly here
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Wrong token');
        next(error)
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token provided');
    }
  } catch (error) {
    next(error);
  }
 
};



export { protect };
 // if (authorization && authorization.startsWith('Bearer')) {
  //   try {
  //     token = authorization.split(' ')[1];

  //     const decoded = jwt.verify(token, process.env.JSON_SECRET);

  //     req.user = await User.findById(decoded.id).select('-password');

  //     next();
  //   } catch (error) {
  //     console.error(error);
  //     res.status(401);
  //     throw new Error('Not authorized, token failed');
  //   }
  // }

  // if (!token) {
  //   res.status(401);
  //   throw new Error('Not authorized, no token');
  // }