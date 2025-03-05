import { Router } from "express"
import { addToCart, getShopCart } from "./shopCart.controller.js"
import { addToCartValidator, getShopCartValidator } from "../middlewares/shopcart-validator.js"

const router = Router()

router.post("/addToCart", addToCartValidator, addToCart)

router.get("/getShopCart", getShopCartValidator, getShopCart)

export default router