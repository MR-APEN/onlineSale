import { Router } from "express"
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getLowStockProducts, getTopProducts } from "./product.controller.js"
import { createProductValidator, getProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator, getLowStockProductsValidator, getTopProductsValidator } from "../middlewares/product-validator.js"

const router = Router()

router.post("/createProduct", createProductValidator, createProduct)

router.get("/getProducts", getProductValidator, getProducts)

router.get("/getProductById/:pid", getProductByIdValidator, getProductById) 

router.put("/updateProduct/:pid", updateProductValidator, updateProduct)

router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct) 

router.get("/getLowStockProducts", getLowStockProductsValidator, getLowStockProducts)

router.get("/getTopProducts", getTopProductsValidator, getTopProducts)

export default router