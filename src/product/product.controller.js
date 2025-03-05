import Product from "./product.model.js"

export const createProduct = async (req, res) => {
    try {
        const data = req.body

        const product = await Product.create(data)

        return res.status(201).json({
            success: true,
            message: "Producto creado con exito!!",
            product
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al crear un nuevo producto",
            error: err.message 
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category").populate("category", "name")

        return res.status(200).json({
            success: true,
            message: "Productos obtenidos con exito!!",
            products
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener productos",
            error: err.message
        })
    }
}   