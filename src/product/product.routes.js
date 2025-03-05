import { Router } from "express"
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getLowStockProducts } from "./product.controller.js"
import { createProductValidator, getProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator, getLowStockProductsValidator } from "../middlewares/product-validator.js"

const router = Router()

router.post("/createProduct", createProductValidator, createProduct)

router.get("/getProducts", getProductValidator, getProducts)

router.get("/getProductById/:pid", getProductByIdValidator, getProductById) 

router.put("/updateProduct/:pid", updateProductValidator, updateProduct)

router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct) 

router.get("/getLowStockProducts", getLowStockProductsValidator, getLowStockProducts)

export default router