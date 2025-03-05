import { body, param } from "express-validator";
import { nameCategoryExist, categoryExist } from "../helpers/db-validators.js"
import { validateField } from "../middlewares/field-validator.js"
import { handleErrors } from "../middlewares/handle-erros.js"
import { validateJWT } from "../middlewares/validator-jwt.js"
import { hasRoles } from "../middlewares/role-validator.js"


export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name", "El nombre es requerido").notEmpty(),
    body("name").custom(nameCategoryExist),
    body("description", "La descripción es requerida").notEmpty(),  
    validateField,
    handleErrors
]

export const getCategoriesValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateField,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("cid", "No es un ID válido de MongoDB").isMongoId(),
    param("cid").custom(categoryExist),
    body("name").custom(nameCategoryExist),
    validateField,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("cid", "No es un ID válido de MongoDB").isMongoId(),
    param("cid").custom(categoryExist),
    validateField,
    handleErrors
]