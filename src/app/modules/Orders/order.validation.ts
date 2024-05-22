import { z } from 'zod';

const orderValidationSchema = z
  .object({
    email: z.string().email(),
    productId: z.string(),
    price: z.number().positive(),
    quantity: z.number().positive().int().min(1),
  })
  .required();

export default orderValidationSchema;
