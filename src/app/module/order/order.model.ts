import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from './order.interface';


const orderSchema = new Schema<IOrder>({
  email: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Bicycle', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
