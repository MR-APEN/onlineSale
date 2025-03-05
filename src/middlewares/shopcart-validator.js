import { body, param } from "express-validator"
import { validateField } from "./field-validator.js"
import { handleErrors } from "./handle-erros.js"
import { validateJWT } from "./validator-jwt.js"
import { productExist } from "../helpers/db-validators.js"

export const addToCartValidator = [
    validateJWT,
    body("pid", "El id del producto es requerido").notEmpty(),
    body("pid").custom(productExist),
    body("quantity", "La cantidad debe ser un nùmero").isNumeric(),
    validateField,
    handleErrors
]

export const getShopCartValidator = [
    validateJWT,
    validateField,
    handleErrors
]

export const deleteFromShopCartValidator = [
    validateJWT,
    param("pid", "El id del producto es requerido").notEmpty(),
    param("pid").custom(productExist),
    validateField,
    handleErrors
]