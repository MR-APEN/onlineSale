import { Router } from "express"
import { updateUser, updateAnotherUser, updatePassword, updateAnotherPassword, updateProfilePicture, updateAnotherProfilePicture, deleteUser, deleteAnotherUser } from "./user.controller.js"
import { updateUserValidator, updateAnotherUserValidator, updatePasswordValidator, updateAnotherPasswordValidator, uploadProfilePictureValidator, updateAnotherProfilePictureValidator, deleteUserValidator, deleteAnotherUserValidator } from "../middlewares/user-validator.js"
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

/**
 * @swagger
 * /user/updateAnotherUser:
 *   put:
 *     summary: Actualiza otro usuario, solo para administradores
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
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
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error en la solicitud
 */
router.put("/updateAnotherUser", updateAnotherUserValidator, updateAnotherUser)

/**
 * @swagger
 * /user/updatePassword:
 *   patch:
 *     summary: Actualiza la contraseña del usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /user/updateAnotherPassword:
 *   patch:
 *     summary: Actualiza la contraseña de otro usuario, solo para administradores
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.patch("/updateAnotherPassword", updateAnotherPasswordValidator, updateAnotherPassword)

/**
 * @swagger
 * /user/updateProfilePicture:
 *   patch:
 *     summary: Actualiza la foto de perfil del usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.patch("/updateProfilePicture", uploadProfilePicture.single("profilePicture"), uploadProfilePictureValidator, updateProfilePicture)

/**
 * @swagger
 * /user/updateAnotherProfilePicture/{uid}:
 *   patch:
 *     summary: Actualiza la foto de perfil de otro usuario, solo para administradores
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada
 *       400:
 *         description: Error en la solicitud
 */
router.patch("/updateAnotherProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateAnotherProfilePictureValidator, updateAnotherProfilePicture)

/**
 * @swagger
 * /user/deleteUser:
 *   delete:
 *     summary: Elimina el usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       400:
 *         description: Error en la solicitud
 */
router.delete("/deleteUser", deleteUserValidator, deleteUser)

/**
 * @swagger
 * /user/deleteAnotherUser:
 *   delete:
 *     summary: Elimina otro usuario, solo para administradores
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       400:
 *         description: Error en la solicitud
 */
router.delete("/deleteAnotherUser", deleteAnotherUserValidator, deleteAnotherUser)

export default router
