import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import products from './data/product.js'

dotenv.config();

connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('hello from backend test' )
});

app.get('/api/products', (req, res) => {
  res.send(products)
})
app.get('/api/products/:id', (req, res) => {
  const id = req.params.id
  const product = products.find((p) => p._id == id )
  res.send(product)
})

const PORT = process.env.PORT || 5000;
app.listen( PORT, console.log(`server listening on port ${PORT} in ${process.env.NODE_ENV}`));

// const port = 8080;