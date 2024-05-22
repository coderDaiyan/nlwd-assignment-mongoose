import { Schema, model } from 'mongoose';
import { TProduct, TProductModel, TVariant } from './product.interface';

const variantSchema = new Schema<TVariant>(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const productSchema = new Schema<TProduct, TProductModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
});

productSchema.static('ifUserExists', async function ifUserExists(id: string) {
  const data = await this.find({ _id: id });
  return data;
});

// productSchema.post('findOneAndUpdate', (res, next) => {
//   if (res.inventory.quantity === 0) {
//     res.inventory.inStock = false;
//   }
//   next();
// });

const Product = model<TProduct, TProductModel>('Product', productSchema);

export default Product;
