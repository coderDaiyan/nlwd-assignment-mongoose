import { Request, Response } from 'express';
import { TProduct } from './product.interface';
import productService from './product.service';
import { productValidationSchema } from './product.validation';

const createProductController = async (req: Request, res: Response) => {
  try {
    const productData: TProduct = req.body;
    const { data, error } = productValidationSchema
      .required()
      .safeParse(productData);
    if (!error) {
      const createdData = await productService.createProduct({
        _doc: { ...productData },
        ...data,
      });

      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        createdData,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: error.issues,
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: e.message,
      });
    }
  }
};

const getAllProductController = async (req: Request, res: Response) => {
  try {
    const data = await productService.getAllProducts(
      req.query.searchParam ? (req.query.searchParam as string) : '',
    );

    res.status(200).json({
      success: true,
      message: req.query.searchParam
        ? `Products matching search term '${req.query.searchParam}' fetched successfully!`
        : 'Products fetched successfully!',
      data,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: e.message,
      });
    }
  }
};

const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const data = await productService.getProductById(req.params.productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: e.message,
      });
    }
  }
};

const updateProductController = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const { data, error } = productValidationSchema
      .partial()
      .safeParse(updatedData);

    if (!error) {
      const newUpdatedData = await productService.updateProduct(
        req.params.productId,
        data,
      );

      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: newUpdatedData,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: error.issues,
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: e.message,
      });
    }
  }
};

const deleteProductController = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        data: e.message,
      });
    }
  }
};

export default {
  createProductController,
  getAllProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
