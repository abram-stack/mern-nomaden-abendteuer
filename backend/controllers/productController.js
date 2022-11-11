import Product from '../models/productModel.js'

// @desc fetch all the products
const getProducts = async(req,res) => { 
  try {
    const products = await Product.find();
    res.status(200).send(products)
  } catch (error) {
    res.status(500).json({ error: error })
    next(error)
  }
}

const getProduct = async (req, res) => {
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
}

export {getProducts , getProduct}