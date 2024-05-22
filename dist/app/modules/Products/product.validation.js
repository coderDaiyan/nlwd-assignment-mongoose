"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(), // Ensures price is positive
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).min(1), // Ensures at least one tag exists
    variants: zod_1.z.array(zod_1.z
        .object({
        type: zod_1.z.string(),
        value: zod_1.z.string(),
    })
        .required()),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().positive(), // Ensures quantity is positive
        inStock: zod_1.z.boolean(),
    }),
});
exports.productValidationSchema = productValidationSchema;
