import User from "../user/user.model.js"
import { hash, verify } from "argon2"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const defaultUserAdmin = async () => {
    const defaultUser = {
        "name": "Javier",
        "surname": "Apen",
        "username": "Admin1",
        "email": "japen@gmail.com",
        "password": "Ja123456#",
        "profilePicture": "admin_image.jpg",
        "phone": "22334455",
        "role": "ADMIN_ROLE"
    }

    const user = await User.findOne({email: defaultUser.email})
    if(!user){
        defaultUser.password =  await hash(defaultUser.password)
        await User.create(defaultUser)
        console.log(`Admin creado email: ${defaultUser.email}, Username: ${defaultUser.username}, Contraseña: Ja123456#`)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { _id } = req.usuario
        const data = req.body

        const user = await User.findById(_id)

        if(data.role === "ADMIN_ROLE" && user.role !== "ADMIN_ROLE") {
            return res.status(402).json({
                message: "No puedes editar tu role"
            })
        }

        const  userUpdate = await User.findByIdAndUpdate(_id, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Usuario actualizado con exito!!",
            userUpdate
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al intentar actualizar usuario :(",
            error: err.message
        })
    }
}

export const updateAnotherUser = async (req, res) => {
    try {
        const { userId } = req.body
        const data = req.body

        const userUpdate = await User.findByIdAndUpdate(userId, data, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario actualizado con exito!!",
            userUpdate
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar otro usuario :(",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { _id } = req.usuario
        const { newPassword, oldPassword } = req.body

        const user = await User.findById(_id)

        const matchPassword = await verify(user.password, newPassword)
        if(matchPassword){
            return res.status(400).json({
                message: "La contraseña nueva no puede ser igual a la anterior"
            })
        }

        const matchOldPassword = await verify(user.password, oldPassword)
        if(!matchOldPassword){
            return res.status(400).json({
                message: "Tienes que ingresar tu contraseña actual para poder cambiarla"
            })
        }

        const encryptedPassword = await hash(newPassword)
        await User.findByIdAndUpdate(_id, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada con exito!!"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al intentar actualizar contraseña :(",
            error: err.message
        })
    }
}

export const updateAnotherPassword = async (req, res) => {
    try {
        const { userId, newPassword } = req.body
        
        const user = await User.findById(userId)

        const matchPassword = await verify(user.password, newPassword)
        if(matchPassword){
            return res.status(400).json({
                message: "La contraseña nueva no puede ser igual a la anterior"
            })
        }

        const encryptedPassword = await hash(newPassword)
        await User.findByIdAndUpdate(userId, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada con exito!!"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al intentar actualizar contraseña de otro usuario :(",
            error: err.message
        })
    }
}