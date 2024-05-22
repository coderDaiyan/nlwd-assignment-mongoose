"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("./product.model"));
const createProduct = async (product) => {
    const data = await product_model_1.default.create(product);
    return data;
};
const getAllProducts = async (query) => {
    if (query) {
        const regex = new RegExp(query, 'i');
        const queryData = await product_model_1.default.find({
            $or: [{ title: regex }, { category: regex }, { description: regex }],
        });
        return queryData;
    }
    const data = await product_model_1.default.find({});
    return data;
};
const getProductById = async (productId) => {
    const data = await product_model_1.default.find({ _id: productId });
    return data;
};
const updateProduct = async (productId, updatedData) => {
    const checkIfUserExists = product_model_1.default.ifUserExists(productId);
    if (checkIfUserExists) {
        if (updatedData.inventory?.quantity === 0) {
            updatedData.inventory.inStock = false;
        }
        const data = await product_model_1.default.findOneAndUpdate({ _id: productId }, { $set: updatedData }, { new: true });
        return data;
    }
    else {
        return null;
    }
};
const deleteProduct = async (productId) => {
    const data = await product_model_1.default.deleteOne({ _id: productId });
    return data;
};
exports.default = {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
};
