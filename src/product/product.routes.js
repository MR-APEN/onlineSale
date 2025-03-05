import { Router } from "express"
import { createProduct } from "./product.controller.js"
import { createProductValidator } from "../middlewares/product-validator.js"

const router = Router()

router.post("/createProduct", createProductValidator, createProduct)

export default router