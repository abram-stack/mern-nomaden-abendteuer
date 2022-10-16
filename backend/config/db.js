import mongoose from "mongoose";
import { async } from "rxjs";

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log(`Connected with MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.error(`error ${error.message}`);
    process.exit(1)
  }
}

export default connectDB;