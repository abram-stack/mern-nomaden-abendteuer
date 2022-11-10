import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      //required: true
    },
    brand: {
      type: String,
      // required: true,
    },
    baujahr: {
      type: Number,
      // required: true
    },
    countInStock: {
      type: Number,
      // required: true,
      default: 0,
    },
    rating: {
      type: Number,
      // required: true,
      default: false,
    },
    numReviews: {
      type: Number,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
      default: 0,
    },
    review: [reviewSchema],
    
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
