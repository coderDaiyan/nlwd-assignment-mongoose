import { TProduct } from './product.interface';
import Product from './product.model';

const createProduct = async (product: TProduct) => {
  const data = await Product.create(product);
  return data;
};

const getAllProducts = async (query: string) => {
  if (query) {
    const regex = new RegExp(query, 'i');
    const queryData = await Product.find({
      $or: [{ title: regex }, { category: regex }, { description: regex }],
    });
    return queryData;
  }
  const data = await Product.find({});
  return data;
};

const getProductById = async (productId: string) => {
  const data = await Product.find({ _id: productId });
  return data;
};

const updateProduct = async (
  productId: string,
  updatedData: Partial<TProduct>,
) => {
  const checkIfUserExists = Product.ifUserExists(productId);
  if (checkIfUserExists) {
    if (updatedData.inventory?.quantity === 0) {
      updatedData.inventory.inStock = false;
    }
    const data = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: updatedData },
      { new: true },
    );
    return data;
  } else {
    return null;
  }
};

const deleteProduct = async (productId: string) => {
  const data = await Product.deleteOne({ _id: productId });
  return data;
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
