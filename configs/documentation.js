import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title:"Online Sale API",
            version:"1.0.0",
            description:"API web registro de ventas, productos en línea y otras operaciones comerciales de una empresa",
            contact:{
                name:"Javier Apen",
                email:"japen-2023128@kinal.edu.gt"
            }
        },
        servers:[
            {
                url:"http://127.0.0.1:3002/onlineSale/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/category/*.js",
        "./src/product/*.js",
        "./src/shopCart/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }