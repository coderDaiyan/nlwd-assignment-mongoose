import express from 'express';
import productController from './product.controller';

const productRouter = express.Router();

productRouter.post('/', productController.createProductController);
productRouter.get('/', productController.getAllProductController);
productRouter.get('/:productId', productController.getProductByIdController);
productRouter.put('/:productId', productController.updateProductController);
productRouter.delete('/:productId', productController.deleteProductController);

export default productRouter;
