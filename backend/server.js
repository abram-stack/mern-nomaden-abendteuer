import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import Product from './models/productModel.js'
import User from './models/userModel.js';
import bodyParser from 'body-parser';

//router
import productRouter from './routes/productRoutes.js'
import { notFound, errorHandler} from './middleware/errorMiddleware.js'
dotenv.config();

connectDB();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//example of middleware
app.use((req, res, next) => { 
  console.log(req.originalUrl);
  next();
})

app.get('/', (req, res) => {
  res.send('hello from backend test' )
});

app.use('/api/products', productRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen( PORT, console.log(`server listening on port ${PORT} in ${process.env.NODE_ENV}`));

// const port = 8080;