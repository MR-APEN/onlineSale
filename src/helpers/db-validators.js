import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import Product from "../product/product.model.js"

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

export const userExist = async (userId = "") => {
    const exist = await User.findById(userId)
    if(!exist){
        throw new Error(`No existe un usuario con el ID: ${userId}`)
    }
}

export const nameCategoryExist = async (name = "") => {
    const exist = await Category.findOne({name})
    if(exist){
        throw new Error(`La categoria ${name} ya fue registrada`)
    }
}

export const categoryExist = async (cid = "") => {
    const exist = await Category.findById(cid)
    if(!exist){
        throw new Error(`No existe una categoria con el ID: ${cid}`)
    }
}

export const nameProductExist = async (name = "") => {
    const exist = await Product.findOne({name})
    if(exist){
        throw new Error(`El producto ${name} ya fue registrado`)
    }
}