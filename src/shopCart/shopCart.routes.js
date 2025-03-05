import { Router } from "express"
import { addToCart } from "./shopCart.controller.js"
import { addToCartValidator } from "../middlewares/shopcart-validator.js"

const router = Router()

router.post("/addToCart", addToCartValidator, addToCart)

export default router