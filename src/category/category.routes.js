import Router from "express"
import { createCategory, getCategories, updateCategory, deleteCategory } from "./category.controller.js"
import { createCategoryValidator, getCategoriesValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validator.js"

const router = Router()

/**
 * @swagger
 * /category/createCategory:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Category]
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
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.post("/createCategory", createCategoryValidator, createCategory)

/**
 * @swagger
 * /category/getCategories:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categorías obtenidas con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.get("/getCategories", getCategoriesValidator, getCategories) 

/**
 * @swagger
 * /category/updateCategory/{cid}:
 *   put:
 *     summary: Actualiza una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
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
 *     responses:
 *       200:
 *         description: Categoría actualizada con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory) 

/**
 * @swagger
 * /category/deleteCategory/{cid}:
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito
 *       400:
 *         description: Error en la solicitud
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory)

export default router