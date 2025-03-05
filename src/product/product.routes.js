import { Router } from "express"
import { createProduct, getProducts } from "./product.controller.js"
import { createProductValidator, getProductValidator } from "../middlewares/product-validator.js"

const router = Router()

router.post("/createProduct", createProductValidator, createProduct)

router.get("/getProducts", getProductValidator, getProducts)

export default router