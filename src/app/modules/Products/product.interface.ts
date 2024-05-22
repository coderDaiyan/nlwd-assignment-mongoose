import { Model } from 'mongoose';

export type TVariant = {
  type: string;
  value: string;
};

interface DocumentResult<T> {
  _doc: T;
}

export interface TProduct extends DocumentResult<TProduct> {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: {
    quantity: number;
    inStock: boolean;
  };
}

export type TProductModel = Model<TProduct> & {
  // eslint-disable-next-line no-unused-vars
  ifUserExists(id: string): boolean;
};
