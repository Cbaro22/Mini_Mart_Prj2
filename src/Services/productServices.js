import Product from '../modules/productModule.js';

export const createProductService = async (data) => {
  const product = new Product(data);
  return await product.save();
};

export const getAllProductsService = async () => {
  return await Product.find().populate('category');
};

export const getProductByIdService = async (id) => {
  return await Product.findById(id).populate('category');
};

export const updateProductService = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProductService = async (id) => {
  return await Product.findByIdAndDelete(id).populate('category');
};
