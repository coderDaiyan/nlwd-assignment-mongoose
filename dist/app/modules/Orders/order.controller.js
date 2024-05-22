"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../Products/product.service"));
const order_service_1 = __importDefault(require("./order.service"));
const order_validation_1 = __importDefault(require("./order.validation"));
const createOrderController = async (req, res) => {
    try {
        const orderData = req.body;
        const { data, error } = order_validation_1.default.safeParse(orderData);
        if (!error) {
            const productData = await product_service_1.default.getProductById(data.productId);
            if (productData[0].inventory.quantity < data.quantity) {
                res.status(500).json({
                    success: false,
                    message: 'Insufficient quantity available in inventory',
                });
            }
            else {
                const newProductData = {
                    ...productData[0],
                };
                newProductData._doc.inventory = {
                    ...productData[0].inventory,
                    quantity: productData[0].inventory.quantity - data.quantity,
                };
                await product_service_1.default.updateProduct(data.productId, newProductData._doc);
                const newOrderData = await order_service_1.default.createNewOrder(data);
                res.status(200).json({
                    success: true,
                    message: 'Order created successfully!',
                    data: newOrderData,
                });
            }
        }
        else {
            res.status(500).json({
                success: false,
                message: 'something went wrong',
                data: error.issues,
            });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'something went wrong',
                data: e.message,
            });
        }
    }
};
const getAllOrdersController = async (req, res) => {
    try {
        const data = await order_service_1.default.getAllOrders(req.query.email ? req.query.email : '');
        if (data.length === 0) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: req.query.email
                    ? `Orders fetched successfully for user email!`
                    : 'Orders fetched successfully!',
                data,
            });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'something went wrong',
                data: e.message,
            });
        }
    }
};
exports.default = {
    createOrderController,
    getAllOrdersController,
};
