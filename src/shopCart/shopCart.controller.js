import ShopCart from "./shopCart.model.js"
import Product from "../product/product.model.js"

export const addToCart = async (req, res) => {
    try {
        const { _id } = req.usuario
        const { pid, quantity } = req.body

        const shopCart = await ShopCart.findOne({user: _id})

        if(shopCart){
            const productIndex = shopCart.products.findIndex(product => product.product === pid)
            if(productIndex !== -1){
                shopCart.products[productIndex].quantity += quantity
            }else{
                shopCart.products.push({product: pid, quantity})
            }
            await shopCart.save()
        }else{
            const newShopCart = new ShopCart({
                user: _id,
                products: [{product: pid, quantity}]
            })
            await newShopCart.save()
        }

        res.status(201).json({
            success: true,
            message: "Producto agregado al carrito con exito!!"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al intentar agregar producto al carrito :(",
            error: err.message
        })
    }
}