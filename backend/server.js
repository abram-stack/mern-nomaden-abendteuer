const express = require('express');
const products = require ('./data/product');

const app = express();

app.get('/', (req, res) => {
  res.send('hello from backend')
});

app.get('/api/products', (req, res) => {
  res.send(products)
})
app.get('/api/products/:id', (req, res) => {
  const id = req.params.id
  const product = products.find((p) => p._id == id )
  res.send(product)
})

app.listen(5000, console.log('server listening to port 5000'));

// const port = 8080;