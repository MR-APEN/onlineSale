import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { defaultUserAdmin } from "./src/auth/auth.controller.js"

config()
initServer()
defaultUserAdmin()