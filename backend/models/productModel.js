import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const variationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  selectedOption: { type: Number, required: true },
  options: [
    {
      name: { type: String, required: true },
      additionalPrice: { type: Number, required: true, default: 0 },
    },
  ],
});

const personalizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isSelected: { type: Boolean, required: true },
  value: { type: String, required: true },
  additionalPrice: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  reviews: [reviewSchema],
  variations: [variationSchema],
  personalizations: [personalizationSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  variantId: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
