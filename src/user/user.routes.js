import { Router } from "express"
import { updateUser, updateAnotherUser, updatePassword, updateAnotherPassword, updateProfilePicture } from "./user.controller.js"
import { updateUserValidator, updateAnotherUserValidator, updatePasswordValidator, updateAnotherPasswordValidator, uploadProfilePictureValidator } from "../middlewares/user-validator.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
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

router.patch("/updateAnotherPassword", updateAnotherPasswordValidator, updateAnotherPassword)

router.patch("/updateProfilePicture", uploadProfilePicture.single("profilePicture"), uploadProfilePictureValidator, updateProfilePicture)

export default router
