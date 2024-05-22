import express from 'express';
import orderController from './order.controller';

const orderRouter = express.Router();

orderRouter.post('/', orderController.createOrderController);
orderRouter.get('/', orderController.getAllOrdersController);

export default orderRouter;
