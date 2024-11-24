import mongoose from 'mongoose';
import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid product ID',
  }),
  quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
  totalPrice: z.number().nonnegative({ message: 'Total price must be a non-negative number' }),
});
