import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

//@desc get all users
//@route /api/users
//@access  
const getUsers = async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({users})
  } catch (error) {
    res.status(500).json({error: error})
  }
}

//desc Auth user & get token
//@route POST /api/users/login
//@access public
const authUser = async (req, res, next) => { 
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});

    if (user && await(user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token:  generateToken(user._id)
      })
    } else {
      res.status(401);
      throw new Error('Invalid Email or Password')
    }
  } catch (error) {
    next(error)
  }
}

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JSON_SECRET, {expiresIn: '30d'});
  return token;
}
export { authUser, getUsers}