"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
}, { _id: false });
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [variantSchema],
        required: true,
    },
    inventory: {
        quantity: {
            type: Number,
            required: true,
        },
        inStock: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
});
productSchema.static('ifUserExists', async function ifUserExists(id) {
    const data = await this.find({ _id: id });
    return data;
});
// productSchema.post('findOneAndUpdate', (res, next) => {
//   if (res.inventory.quantity === 0) {
//     res.inventory.inStock = false;
//   }
//   next();
// });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
