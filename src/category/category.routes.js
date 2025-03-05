import Router from "express"
import { createCategory, getCategories } from "./category.controller.js"
import { createCategoryValidator, getCategoriesValidator } from "../middlewares/category-validator.js"

const router = Router()

router.post("/createCategory", createCategoryValidator, createCategory)

router.get("/getCategories", getCategoriesValidator, getCategories) 

export default router