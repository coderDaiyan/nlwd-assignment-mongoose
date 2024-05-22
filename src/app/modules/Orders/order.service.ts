import { TOrder } from './order.interface';
import Order from './order.model';

const createNewOrder = async (orderData: TOrder) => {
  const data = await Order.create(orderData);
  return data;
};

const getAllOrders = async (query: string) => {
  if (query) {
    const queryData = await Order.find({
      email: query,
    });
    return queryData;
  }
  const data = await Order.find({});
  return data;
};

export default {
  createNewOrder,
  getAllOrders,
};
