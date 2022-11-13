import mongoose from 'mongoose';
import bcrypt  from 'bcryptjs';

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
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;
