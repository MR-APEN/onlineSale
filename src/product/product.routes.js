import { Router } from "express"
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getLowStockProducts, getTopProducts } from "./product.controller.js"
import { createProductValidator, getProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator, getLowStockProductsValidator, getTopProductsValidator } from "../middlewares/product-validator.js"

const router = Router()

/**
 * @swagger
 * /product/createProduct:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.post("/createProduct", createProductValidator, createProduct)

/**
 * @swagger
 * /product/getProducts:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Productos obtenidos con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.get("/getProducts", getProductValidator, getProducts)

/**
 * @swagger
 * /product/getProductById/{pid}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.get("/getProductById/:pid", getProductByIdValidator, getProductById) 

/**
 * @swagger
 * /product/updateProduct/{pid}:
 *   put:
 *     summary: Actualiza un producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.put("/updateProduct/:pid", updateProductValidator, updateProduct)

/**
 * @swagger
 * /product/deleteProduct/{pid}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct) 

/**
 * @swagger
 * /product/getLowStockProducts:
 *   get:
 *     summary: Obtiene productos con bajo stock
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Productos con bajo stock obtenidos con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.get("/getLowStockProducts", getLowStockProductsValidator, getLowStockProducts)

/**
 * @swagger
 * /product/getTopProducts:
 *   get:
 *     summary: Obtiene los productos más vendidos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Productos más vendidos obtenidos con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.get("/getTopProducts", getTopProductsValidator, getTopProducts)

export default router