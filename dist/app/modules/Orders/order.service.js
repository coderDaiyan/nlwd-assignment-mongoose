"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("./order.model"));
const createNewOrder = async (orderData) => {
    const data = await order_model_1.default.create(orderData);
    return data;
};
const getAllOrders = async (query) => {
    if (query) {
        const queryData = await order_model_1.default.find({
            email: query,
        });
        return queryData;
    }
    const data = await order_model_1.default.find({});
    return data;
};
exports.default = {
    createNewOrder,
    getAllOrders,
};
