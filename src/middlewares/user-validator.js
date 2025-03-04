import { body} from "express-validator"
import { emailExist, usernameExist, userIdExist } from "../helpers/db-validators.js"
import { validateField } from "./field-validator.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-erros.js"
import { validateJWT } from "./validator-jwt.js"
import { hasRoles } from "./role-validator.js"

export const registerValidator = [
    body("name", "El nombre es requerido").notEmpty(),
    body("username", "El username es requerido").notEmpty(),
    body("email", "El email es requerido").notEmpty(),
    body("email").custom(emailExist),
    body("username").custom(usernameExist),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validateField,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validateField,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    validateField,
    handleErrors
]

export const updateAnotherUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("userId", "El ID del usuario a modificar es requerido").notEmpty(),
    body("userId").custom(userIdExist),
    validateField,
    handleErrors
]