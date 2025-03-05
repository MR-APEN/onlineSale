import Category from "./category.model.js"
import Product from "../product/product.model.js"

export const defaultCategory = async () => {
    const defaultCategory = {
        "name": "Sin asignar",
        "description": "Categoria por defecto, asignar categoria "
    }

    const category = await Category.findOne({name: defaultCategory.name})
    if(!category){
        await Category.create(defaultCategory)
        console.log(`Categoria creada: ${defaultCategory.name}`)
    }
}

export const createCategory = async (req, res) => {
    try {
        const data = req.body
        const category = await Category.create(data)

        res.status(201).json({
            success: true,
            message: "Categoria creada con exito!!",
            category
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al intentar crear categoria :(",
            error: err.message
        })
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()

        res.status(200).json({
            success: true,
            message: "Categorias obtenidas con exito!!",
            categories
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al intentar obtener categorias :(",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { cid } = req.params
        const data = req.body

        const categoryUpdate = await Category.findByIdAndUpdate(cid, data, {new: true})

        return res.status(200).json({
            success: true,
            message: "Categoria actualizada con exito!!",
            categoryUpdate
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al intentar actualizar categoria :(",
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { cid } = req.params

        await Category.findByIdAndUpdate(cid, {status: false}, {new: true})
        const defaultCategory = await Category.findOne({name: "Sin asignar"})

        await Product.updateMany({category: cid}, {category: defaultCategory.id})

        return res.status(200).json({
            success: true,
            message: "Categoria eliminada con exito!!"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al intentar eliminar categoria :(",
            error: err.message
        })
    }
}