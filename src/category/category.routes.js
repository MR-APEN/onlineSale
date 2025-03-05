import Router from "express"
import { createCategory, getCategories, updateCategory } from "./category.controller.js"
import { createCategoryValidator, getCategoriesValidator, updateCategoryValidator } from "../middlewares/category-validator.js"

const router = Router()

router.post("/createCategory", createCategoryValidator, createCategory)

router.get("/getCategories", getCategoriesValidator, getCategories) 

router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory) 

export default router