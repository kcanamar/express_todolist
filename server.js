////////////////////////
// Importing Our Dependencies
////////////////////////
require("dotenv").config() // Get our .env variables
const express = require("express") // Web Framework
const mongoose = require("mongoose") // Object Document Manager (Work with DataBase)
const methodOverride = require("method-override") // Override request methods
const morgan = require("morgan") // Used for logging

//////////////////////
// Setup Database Connection
//////////////////////
// Loading db url
const DATABASE_URL = process.env.DATABASE_URL

// establish connection
mongoose.connect(DATABASE_URL)

// Save the connection 
const cxn = mongoose.connection

// setup up mongoose messages
cxn
.on("open", () => console.log("mongo connected")) 
.on("closed", () => console.log("mongo disconnected"))
.on("error", (err) => console.log(err))

//////////////////////
// Schema and Models
//////////////////////

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
// Declare Routes and Routers 
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show

// index
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})
///////////////////////////
// Server Listener
///////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))