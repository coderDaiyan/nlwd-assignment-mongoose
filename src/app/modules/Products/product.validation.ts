import { z } from 'zod';

const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(), // Ensures price is positive
  category: z.string(),
  tags: z.array(z.string()).min(1), // Ensures at least one tag exists
  variants: z.array(
    z
      .object({
        type: z.string(),
        value: z.string(),
      })
      .required(),
  ),
  inventory: z.object({
    quantity: z.number().positive(), // Ensures quantity is positive
    inStock: z.boolean(),
  }),
});
export { productValidationSchema };
