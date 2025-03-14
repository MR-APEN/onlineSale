import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoute from "../src/auth/auth.routes.js"
import apiLimiter from "../src/middlewares/request-validator.js"
import { swaggerDocs, swaggerUi } from "./documentation.js"
import userRoute from "../src/user/user.routes.js"
import categoryRoute from "../src/category/category.routes.js"
import productRoute from "../src/product/product.routes.js"
import shopCartRoute from "../src/shopCart/shopCart.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/onlineSale/v1/auth", authRoute)
    app.use("/onlineSale/v1/user", userRoute)
    app.use("/onlineSale/v1/category", categoryRoute)
    app.use("/onlineSale/v1/product", productRoute)
    app.use("/onlineSale/v1/shopCart", shopCartRoute)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const connectDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed ${err}`)
        process.exit(1)
    }
}


export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        connectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed ${err}`)
    }
}