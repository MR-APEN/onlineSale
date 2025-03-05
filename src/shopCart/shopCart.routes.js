import { Router } from "express"
import { addToCart, getShopCart, deleteFromShopCart } from "./shopCart.controller.js"
import { addToCartValidator, getShopCartValidator, deleteFromShopCartValidator } from "../middlewares/shopcart-validator.js"

const router = Router()

/**
 * @swagger
 * /shopCart/addToCart:
 *   post:
 *     summary: Agrega un producto al carrito de compras
 *     tags: [ShopCart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto agregado al carrito con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.post("/addToCart", addToCartValidator, addToCart)

/**
 * @swagger
 * /shopCart/getShopCart:
 *   get:
 *     summary: Obtiene el carrito de compras del usuario
 *     tags: [ShopCart]
 *     responses:
 *       200:
 *         description: Carrito de compras obtenido con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.get("/getShopCart", getShopCartValidator, getShopCart)

/**
 * @swagger
 * /shopCart/deleteToCart/{pid}:
 *   delete:
 *     summary: Elimina un producto del carrito de compras
 *     tags: [ShopCart]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.delete("/deleteToCart/:pid", deleteFromShopCartValidator, deleteFromShopCart)

export default router