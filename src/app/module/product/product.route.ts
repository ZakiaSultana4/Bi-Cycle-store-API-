import { Router } from 'express'
import { productController } from './product.controller'

const productRouter = Router()

productRouter.post('/', productController.createSingleProduct)
productRouter.get('/', productController.getAllBicycle)
productRouter.get('/:productId', productController.getSingleBicycle)
productRouter.put('/:productId', productController.updateBicycle)
productRouter.delete('/:productId', productController.deleteBicycle)

export default productRouter