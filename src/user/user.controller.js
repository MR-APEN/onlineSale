import User from "../user/user.model.js"
import { hash, verify } from "argon2"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import fs from "fs/promises"

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

        const user = await User.findById(userId)
        if(user.role === "ADMIN_ROLE") {
            return res.status(402).json({
                message: "No puedes editar un usuario administrador"
            })
        }

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
        if(user.role === "ADMIN_ROLE") {
            return res.status(402).json({
                message: "No puedes editar la contraseña de un usuario administrador"
            })
        }

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


export const updateProfilePicture = async (req, res) => {
    try {
        const { _id } = req.usuario
        let newProfilePicture = req.file ? req.file.filename : null
        if(!newProfilePicture) {
            return res.status(400).json({
                success: false,
                message: "No se encontro un archivo en la petición"
            })
        }

        const user = await User.findById(_id)
        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Foto de perfil actualizada con exito!!",
            profilePicture: user.profilePicture
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar foto de perfil",
            error: err.message
        })
    }
}

export const updateAnotherProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params
        let newProfilePicture = req.file ? req.file.filename : null
        if(!newProfilePicture) {
            return res.status(400).json({
                success: false,
                message: "No se encontro un archivo en la petición"
            })
        }

        const user = await User.findById(uid)
        if(user.role === "ADMIN_ROLE") {
            return res.status(402).json({
                message: "No puedes editar la foto de perfil de un usuario administrador"
            })
        }

        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Foto de perfil actualizada con exito!!",
            profilePicture: user.profilePicture
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar foto de perfil",
            error: err.message
        })
    }
}

export const  deleteUser = async(req, res) => {
    try{
        const { _id } = req.usuario
        const { password } = req.body

        const user = await User.findById(_id)
        const matchPassword = await verify(user.password, password)
        if(!matchPassword) {
            return res.status(400).json({
                message: "Tienes que ingresar tu contraseña para eliminarte"
            })
        }

        const userDelete = await User.findByIdAndUpdate(_id, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado con exito!!",
            userDelete
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al intentar eliminar usuario",
            error: err.message
        })
    }
}

export const deleteAnotherUser = async (req, res) => {
    try{
        const { userId } = req.body

        const user = await User.findById(userId)
        if(user.role === "ADMIN_ROLE") {
            return res.status(402).json({
                message: "No puedes eliminar a un usuario Administrador"
            })
        }

        const userDelete = await User.findByIdAndUpdate(userId, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado con exito!!",
            userDelete
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar otro usuario",
            error: err.message
        })
    }
}