import express from 'express'
import Product from '../models/productModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products)
  } catch (error) {
    res.status(500).json({ error: error })
    next(error)
  }

})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id);
    res.status(200).send(product)
  } catch (error) {
    res.status(404);
    next(error)
    //TODO: if id is valid but not exist, error handling
    // new Error('not found')
  }
})

router.post('/', async (req, res) => { 
  try {
    const product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({error: error})
  }
  
})

export default router;