import { Schema, model } from "mongoose"

const shopCartSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    products:[
        {
            product:{
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true 
            },
            quantity:{
                type: Number,
                required: true,
                min: 1 
            }
        }
    ]
},
{
    versionKey: false,
    timestamps: true
})

export default model("ShopCart", shopCartSchema)