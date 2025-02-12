import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res) => {
    try {
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data)

        return res.status(201).json({
            message: "Usuario registrado con exito",
            name: user.name,
            email: user.email
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar usuario",
            error: err.message
        })
    }
}

export const login = async (req,res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })
        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Error al logearse",
            error: err.message
        })
    }
}


export const defaultUserAdmin = async () => {
    const defaultUser = {
        "name": "Javier",
        "surname": "Apen",
        "username": "Admin1",
        "email": "japen@gmail.com",
        "password": "Ja123456#",
        "profilePicture": "admin_image.jpg",
        "phone": "22334455",
        "role": "ADMIN_ROLE"
    }

    const user = await User.findOne({email: defaultUser.email})
    if(!user){
        defaultUser.password =  await hash(defaultUser.password)
        await User.create(defaultUser)
        console.log(`Admin creado email: ${defaultUser.email}, Username: ${defaultUser.username}, Contraseña: Ja123456#`)
    }
}
