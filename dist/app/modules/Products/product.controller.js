"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("./product.service"));
const product_validation_1 = require("./product.validation");
const createProductController = async (req, res) => {
    try {
        const productData = req.body;
        const { data, error } = product_validation_1.productValidationSchema
            .required()
            .safeParse(productData);
        if (!error) {
            const createdData = await product_service_1.default.createProduct({
                _doc: { ...productData },
                ...data,
            });
            res.status(200).json({
                success: true,
                message: 'Product created successfully!',
                data: createdData,
            });
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
const getAllProductController = async (req, res) => {
    try {
        const data = await product_service_1.default.getAllProducts(req.query.searchTerm ? req.query.searchTerm : '');
        res.status(200).json({
            success: true,
            message: req.query.searchTerm
                ? `Products matching search term '${req.query.searchTerm}' fetched successfully!`
                : 'Products fetched successfully!',
            data,
        });
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
const getProductByIdController = async (req, res) => {
    try {
        const data = await product_service_1.default.getProductById(req.params.productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data,
        });
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
const updateProductController = async (req, res) => {
    try {
        const updatedData = req.body;
        const { data, error } = product_validation_1.productValidationSchema
            .partial()
            .safeParse(updatedData);
        if (!error) {
            const newUpdatedData = await product_service_1.default.updateProduct(req.params.productId, data);
            res.status(200).json({
                success: true,
                message: 'Product updated successfully!',
                data: newUpdatedData,
            });
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
const deleteProductController = async (req, res) => {
    try {
        await product_service_1.default.deleteProduct(req.params.productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
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
    createProductController,
    getAllProductController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
};
