import Category from "./category.model.js"

export const defaultCategory = async () => {
    const defaultCategory = {
        "name": "Alimentos",
        "description": "Categoria de alimentos"
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