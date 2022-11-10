import dotenv from 'dotenv'
import connectDB from './config/db.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js'; 
import users from './data/users.js';
import products from './data/product.js'

dotenv.config();

connectDB();

const importToDb = async () => {
  console.log('you call import')
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    // const { _id: adminId } = createdUsers.find((u) => u.isAdmin === true)
    
    const productsWithAdminID = products.map((product) => { 
      return {...product, user: adminUser }
      } 
    )

    // console.log(productsWithAdminID);
    await Product.insertMany(productsWithAdminID);


    // const product = await Product.create(productsWithAdminID[0]);
    console.log('data has been imported');
    process.exit();
  } catch (error) {
    console.error;
    process.exit(1);
  }
}

const deleteData = async() => {
  try {
    console.log('you call delete');
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data deleteeeeed')
    process.exit();
  } catch (error) {
    console.error;
  }
}

if (process.argv[2] === '-d') { 
  deleteData();
}
else {
  importToDb();
 } 