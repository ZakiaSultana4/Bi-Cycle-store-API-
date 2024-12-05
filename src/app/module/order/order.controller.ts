import { Request, Response } from 'express';
import { Bicycle } from '../product/product.model';
import { orderService } from './order.service';
import Order from './order.model';
import { orderValidationSchema,} from './order.validation';
import mongoose from 'mongoose';
import { IOrder } from './order.interface';

const createOrder = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
      const customerEmail = req.body.email;
      const productId = req.body.product;
      const productQuantity = req.body.quantity;
      const productPrice = req.body.totalPrice;
  
      // Validate presence of required fields
      if (!customerEmail || !productId || !productQuantity || productPrice === undefined) {
        return res.status(400).json({
          status: false,
          message: 'Missing required fields: email, product, quantity, or totalPrice',
        });
      }
  
      // Validate product ID format
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          status: false,
          message: 'Invalid product ID',
        });
      }
  
      const purchaseBicycle = await Bicycle.findById(productId);
  
      // Check if product exists
      if (!purchaseBicycle) {
        return res.status(404).json({
          status: false,
          message: 'Bicycle not found',
        });
      }
  
      // Check for sufficient stock
      if (purchaseBicycle.quantity < productQuantity) {
        return res.status(400).json({
          status: false,
          message: `Insufficient stock for product: ${purchaseBicycle.name}. Available stock: ${purchaseBicycle.quantity}`,
        });
      }
  
      // Validate order data using Zod schema
      try {
        const validatedData = orderValidationSchema.parse({
          email: customerEmail,
          product: productId,
          quantity: productQuantity,
          totalPrice: productPrice,
        });
  
        const orderData: IOrder = {
          ...validatedData,
          product: new mongoose.Types.ObjectId(validatedData.product), 
        };
  
        // Save the order to the database
        const result = await orderService.createOrderToDb(orderData);
  
        // Update product stock
        purchaseBicycle.quantity -= productQuantity;
        if (purchaseBicycle.quantity === 0) {
          purchaseBicycle.inStock = false;
        }
        await purchaseBicycle.save();
  
        return res.status(201).json({
          status: true,
          message: 'Order created successfully',
          data: result,
        });
      } catch (validationError: any) {
        // Handle validation errors from Zod
        return res.status(422).json({
          status: false,
          message: 'Validation failed',
          errors: validationError.errors?.map((err: any) => err.message),
        });
      }
    } catch (error: any) {
      console.error('Error creating order:', error);
      return res.status(500).json({
        status: false,
        message: 'Internal server error',
        error: error.message || error,
      });
    }
  };

  const getRevenue = async (req: Request, res: Response): Promise<void> => {
    try {
   
        const result = await Order.aggregate([
            {
                $lookup: {
                    from: 'bicycles',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'revenue',
                },
            },
            {
                $unwind: '$revenue',
            },
            {
                $addFields: {
                    totalPrice: {
                        $multiply: ['$revenue.price', '$quantity'],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
        ]);


        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;


        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue,
            },
        });
    } catch (error: any) {

        console.error('Error calculating revenue:', error);
    
        if (error.name === 'ValidationError') {
            res.status(422).json({
                status: false,
                message: 'Validation error during revenue calculation',
                errors: error.errors,
            });
        } else if (error.name === 'CastError') {
            res.status(400).json({
                status: false,
                message: 'Invalid input data',
                error: error.message,
            });
        } else {
            res.status(500).json({
                status: false,
                message: 'Internal server error during revenue calculation',
                error: error.message || 'Unknown error',
            });
        }
    }
};

export const orderController = {
    createOrder,
    getRevenue
}

