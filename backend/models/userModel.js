import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// function: compare password, input: raw pass. in DB: encrpyted. it takes (inserted password) as param
// in mongoose: we use the schema object, call its "methods" and we define our "function"
// we can call this "function" from an object created,
//arrow function can only access this as parent class. not as the object
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//middlware to hash the password
//so we have to pass next
//why we check if modified first?
//  use case:not creating new user. when client update info,-> go through this middleware.
//  we dont want to hashing everytime. otherwise user cant log in.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
