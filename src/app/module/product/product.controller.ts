
import { Request, Response } from 'express'
import { productService } from './product.service'
import BicycleValidationSchema from './product.validation';

const createSingleProduct = async (req: Request, res: Response) => {
    try {
        const payload =req.body
        const zodParsedData=BicycleValidationSchema.parse(payload)
        const result =await productService.createBicycleToDb(zodParsedData)    
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Product add failed",
            data: error,
          });
    }
}

const getAllBicycle= async (req: Request, res: Response) => {
    try {
        const query = req.query.searchTerm;
        const result = await productService.getAllBicycleFromDb(query)

        res.status(200).json({
            success: true,
            message: "Bicycles retrieved successfully",
            data: result,
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Products fetched failed",
            data: error,
          });
    }
}


const getSingleBicycle = async (req: Request, res: Response) => {
    try {
      const productId = req.params.productId
  
      const result = await productService.getSingleBicycle(productId)
  
      res.status(200).json({
        success: true,
        message: "Bicycle retrieved successfully",
        data: result,
      });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Products fetched failed",
            data: error,
          });
    }
  }

  const updateBicycle = async (req: Request, res: Response) => {
    try {
      const productId = req.params.productId
      const body = req.body
      const result = await productService.updateBicycle(productId, body)
  
      res.status(200).json({
        success: true,
        message: "Bicycle updated successfully",
        data: result,
      });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Products fetched failed",
            data: error,
          });
    }
  }
  
  const deleteBicycle = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      await productService.deleteBicycle(productId);
  
      // Send response with empty data
      res.status(200).json({
        success: true,
        message: "Bicycle deleted successfully!",
        data: {}, // Empty data object
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Product deletion failed",
        error: error
      });
    }
  };
  
export const productController = {
    createSingleProduct,
    getAllBicycle,
getSingleBicycle,
updateBicycle,
deleteBicycle
}