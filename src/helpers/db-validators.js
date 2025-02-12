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