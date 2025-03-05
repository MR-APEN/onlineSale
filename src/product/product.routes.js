import { Router } from "express"
import { createProduct, getProducts, getProductById, updateProduct } from "./product.controller.js"
import { createProductValidator, getProductValidator, getProductByIdValidator, updateProductValidator } from "../middlewares/product-validator.js"

const router = Router()

router.post("/createProduct", createProductValidator, createProduct)

router.get("/getProducts", getProductValidator, getProducts)

router.get("/getProductById/:pid", getProductByIdValidator, getProductById) 

router.put("/updateProduct/:pid", updateProductValidator, updateProduct)

export default router