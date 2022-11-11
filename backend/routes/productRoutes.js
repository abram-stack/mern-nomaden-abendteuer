import express from 'express'
import { getProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts)

router.route('/:id').get(getProduct);

router.post('/', async (req, res) => { 
  try {
    const product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({error: error})
  }
  
})

export default router;