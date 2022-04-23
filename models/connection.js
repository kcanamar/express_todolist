////////////////////////
// Setup - Import deps
////////////////////////
require("dotenv").config()
const mongoose = require('mongoose')

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

///////////////////////
// Exports
///////////////////////
module.exports = mongoose