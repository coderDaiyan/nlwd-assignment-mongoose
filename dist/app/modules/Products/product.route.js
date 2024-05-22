"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("./product.controller"));
const productRouter = express_1.default.Router();
productRouter.post('/', product_controller_1.default.createProductController);
productRouter.get('/', product_controller_1.default.getAllProductController);
productRouter.get('/:productId', product_controller_1.default.getProductByIdController);
productRouter.put('/:productId', product_controller_1.default.updateProductController);
productRouter.delete('/:productId', product_controller_1.default.deleteProductController);
exports.default = productRouter;
