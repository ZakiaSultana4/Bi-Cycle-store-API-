
import { z } from 'zod';
import { BicycleType } from './product.interface';

// Zod validation schema
export const BicycleValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().min(0, 'Price must be a non-negative number'),
  type: z.enum([
    BicycleType.Mountain,
    BicycleType.Road,
    BicycleType.Hybrid,
    BicycleType.BMX,
    BicycleType.Electric,
  ]),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  quantity: z.number().int().nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

export default BicycleValidationSchema