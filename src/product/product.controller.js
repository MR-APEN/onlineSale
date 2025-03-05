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