
import Category from '../modules/categoryModule.js';

export const createCategory = async (data) => {
  const exists = await Category.findOne({ name: data.name });
  if (exists) throw new Error('Category name already exists');
  const category = await Category.create(data);
  return category;
};


export const getAllCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};


export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error('Category not found');
  return category;
};


export const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id);
  if (!category) throw new Error('Category not found');

  Object.assign(category, data);
  await category.save();
  return category;
};


export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new Error('Category not found');
  await category.deleteOne();
  return { message: 'Category deleted successfully', deleteCategory };
};
