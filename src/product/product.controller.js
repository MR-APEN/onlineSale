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

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params

        const product = await Product.findById(pid).populate("category", "name")

        return res.status(200).json({
            success: true,
            message: "Producto obtenido con exito!!",
            product
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener producto",
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const data = req.body

        const productUpdate = await Product.findByIdAndUpdate(pid, data, {new: true})
        
        return res.status(200).json({
            success: true,
            message: "Producto actualizado con exito!!",
            productUpdate
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar producto",
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params

        await Product.findByIdAndUpdate(pid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Producto eliminado con exito!!"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar producto",
            error: err.message
        })
    }
}

export const getLowStockProducts = async (req, res) => {
    try {
        const products = await Product.find({stock: 0}).populate("category", "name")
        if(products.length === 0){
            return res.status(404).json({
                success: false,
                message: "No hay productos con stock bajo"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Productos con stock bajo obtenidos con exito!!",
            products
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener productos con stock bajo",
            error: err.message
        })
    }
}


export const getTopProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({salesCount: -1}).limit(5).populate("category", "name")

        return res.status(200).json({
            success: true,
            message: "Productos más vendidos obtenidos con exito!!",
            products
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener productos más vendidos",
            error: err.message
        })
    }
}