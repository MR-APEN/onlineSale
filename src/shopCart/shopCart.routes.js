import { Router } from "express"
import { addToCart, getShopCart, deleteFromShopCart } from "./shopCart.controller.js"
import { addToCartValidator, getShopCartValidator, deleteFromShopCartValidator } from "../middlewares/shopcart-validator.js"

const router = Router()

router.post("/addToCart", addToCartValidator, addToCart)

router.get("/getShopCart", getShopCartValidator, getShopCart)

router.delete("/deleteToCart/:pid", deleteFromShopCartValidator, deleteFromShopCart)

export default router