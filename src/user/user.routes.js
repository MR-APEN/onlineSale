import { Router } from "express"
import { updateUser, updateAnotherUser, updatePassword, updateAnotherPassword, updateProfilePicture, updateAnotherProfilePicture, deleteUser } from "./user.controller.js"
import { updateUserValidator, updateAnotherUserValidator, updatePasswordValidator, updateAnotherPasswordValidator, uploadProfilePictureValidator, updateAnotherProfilePictureValidator, deleteUserValidator } from "../middlewares/user-validator.js"
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

router.patch("/updateAnotherProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateAnotherProfilePictureValidator, updateAnotherProfilePicture)

router.delete("/deleteUser", deleteUserValidator, deleteUser)

export default router
