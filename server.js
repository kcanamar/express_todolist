////////////////////////
// Importing Our Dependencies
////////////////////////
require("dotenv").config() // Get our .env variables
const express = require("express") // Web Framework
const methodOverride = require("method-override") // Override request methods
const morgan = require("morgan") // Used for logging
const todoRouter = require("./controllers/TodoCtrl")


///////////////////////////////////////
// Create Express Application
///////////////////////////////////////
const app = express()

///////////////////////////
// Middleware - app.use(middleware function) or (req, res, next)
///////////////////////////
app.use(methodOverride("_method")) // override request methods for form submissions
app.use(morgan("dev")) // log every request
app.use(express.urlencoded({extended: true})) // parse html form bodies into req.body
app.use("/static", express.static("static")) // serve files statically

///////////////////////
// Declare Routers 
///////////////////////
app.use("/todo", todoRouter)
///////////////////////////
// Server Listener
///////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))