import { Router } from "express"
import { updateUser, updateAnotherUser, updatePassword } from "./user.controller.js"
import { updateUserValidator, updateAnotherUserValidator, updatePasswordValidator } from "../middlewares/user-validator.js"

const router = Router()

/**
 * @swagger
 * /user/updateUser:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error en la solicitud
 */
router.put("/updateUser", updateUserValidator, updateUser)

router.put("/updateAnotherUser", updateAnotherUserValidator, updateAnotherUser)

router.patch("/updatePassword", updatePasswordValidator, updatePassword)

export default router
