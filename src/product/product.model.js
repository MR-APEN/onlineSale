import { Schema, model } from "mongoose"

const productSchema = Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number, 
        required: true,
        min: 0
    },
    stock:{
        type: Number,
        required: true,
        min: 0
    },
    salesCount:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
}
)

export default model('Product', productSchema)