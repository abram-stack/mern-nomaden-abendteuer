import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

//@desc get all users
//@route /api/users
//@access
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//desc Auth user & get token
//@route POST /api/users/login
//@access public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid Email or Password');
    }
  } catch (error) {
    next(error);
  }
};

//@desc get user profile
//@route GET/api/users/profile
//@access private
const getUserProfile = async (req, res) => {
  //if we get the user, (that passed the test: user has the correct token) middleware
  //show user's info
  const user = req.user;
  res.json({ user });
};

const updateUserProfile = async(req, res, next) => { 
  try {
    const user = req.user;
    if (!user) {
      res.status(400)
      throw new Error('User not found')
    }
    const { name, email, password } = req.body;

    //update the infos
    if (name)
      user.name = name
    if (email)
      user.email = email
    if (password)
      user.password = password
    
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
      //REVIEW: new token needed?
    })
  } catch (error) {
    next(error)
  }
}

//@desc create user or user registration
//@route POST/api/users
//@access private
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400);
      throw new Error('User is already exist');
    }

    if (name === '' || email === '' || password === '') {
      res.status(500);
      throw new Error('Name, email and password cannot be empty');
    }
    
    //create user
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

export { authUser, getUsers, getUserProfile, createUser, updateUserProfile };
