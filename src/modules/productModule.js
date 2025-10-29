import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' }, 
  quantity: { type: Number, default: 0 },
  inStock: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });

productSchema.pre('save', function(next){
  this.inStock = (this.quantity > 0);
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;