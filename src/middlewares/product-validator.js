import { body } from "express-validator"
import { nameProductExist } from "../helpers/db-validators.js"
import { validateField } from "./field-validator.js"
import { handleErrors } from "./handle-erros.js"
import { validateJWT } from "./validator-jwt.js"
import { hasRoles } from "./role-validator.js"

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name", "El nombre es requerido").notEmpty(),
    body("name").custom(nameProductExist),
    body("category", "La categoria es requerida").notEmpty(),
    body("price", "El precio es requerido").notEmpty(),
    body("price", "El precio debe ser un número").isNumeric(),
    body("stock", "El stock es requerido").notEmpty(),
    body("stock", "El stock debe ser un número").isNumeric(),
    validateField,
    handleErrors
]