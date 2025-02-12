import { Schema, model } from "mongoose"

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Nombre requerido"],
        maxLength: [25, "Nombre no puede exceder los 25 caracteres"]
    },
    surname:{
        type: String,
        required: [true, "Apellido requerido"],
        maxLength: [25, "Apellido no puede exceder los 25 caracteres"]
    },
    username:{
        type: String,
        required: [true, "Nombre de usuario requerido"],
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email requerido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Contraseña requerida"]
    },
    profilePicture:{
        type: String
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, "Teléfono requerido"]
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
        default: "CLIENT_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("User", userSchema)