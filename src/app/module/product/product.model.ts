import mongoose, { Schema, Document } from 'mongoose';
import { BicycleType, IBicycle } from './product.interface';

// Bicycle schema
const bicycleSchema = new Schema<IBicycle>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: Object.values(BicycleType),
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  
},
{
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
}
);

// Create a model from the schema
const Bicycle = mongoose.model<IBicycle>('Bicycle', bicycleSchema);

export { Bicycle, BicycleType };
