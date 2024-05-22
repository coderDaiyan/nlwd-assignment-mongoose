import { Request, Response } from 'express';
import { TProduct } from '../Products/product.interface';
import productService from '../Products/product.service';
import orderService from './order.service';
import orderValidationSchema from './order.validation';

const createOrderController = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { data, error } = orderValidationSchema.safeParse(orderData);

    if (!error) {
      const productData: Array<TProduct> = await productService.getProductById(
        data.productId,
      );
      if (productData[0].inventory.quantity < data.quantity) {
        res.status(500).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      } else {
        const newProductData = {
          ...productData[0],
        };
        newProductData._doc.inventory = {
          ...productData[0].inventory,
          quantity: productData[0].inventory.quantity - data.quantity,
        };

        await productService.updateProduct(data.productId, newProductData._doc);

        const newOrderData = await orderService.createNewOrder(data);

        res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: newOrderData,
        });
      }
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

const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const data = await orderService.getAllOrders(
      req.query.email ? (req.query.email as string) : '',
    );

    if (data.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: req.query.email
          ? `Orders fetched successfully for user email!`
          : 'Orders fetched successfully!',
        data,
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

export default {
  createOrderController,
  getAllOrdersController,
};
