import express from "express"
require("dotenv").config();

import appRoutes from "./routes"
import bodyParser from "body-parser"
import configCors from "./config/cors";
import connection from "./config/connectDB";

const app = express()
const PORT = process.env.PORT || 8081

// config Cors
configCors(app)

// config body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// test connection DB
connection()

// init routes
appRoutes(app)

app.listen(PORT, () => {
    console.log(">>> backend KTX is running on the port = ", PORT);
})