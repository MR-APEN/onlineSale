import User from "../user/user.model.js"

export const emailExist = async (email = "") => {
    const exist = await User.findOne({email})
    if(exist){
        throw new Error(`El email ${email} ya fue registrado`)
    }
}

export const usernameExist = async (username = "") => {
    const exist = await User.findOne({username})
    if(exist){
        throw new Error(`El nombre de usuario ${username} ya fue registrado`)
    }
}

export const userIdExist = async (userId = "") => {
    const exist = await User.findById(userId)
    if(!exist){
        throw new Error(`No existe un usuario con el ID: ${userId}`)
    }
}