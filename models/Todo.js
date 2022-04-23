////////////////////////
// Setup - Import deps
////////////////////////
const mongoose = require("./connection") // inport the already connected object

//////////////////////
// Schema and Models
//////////////////////
// Schema the definition of our data type
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
}, {timestamps: true})

// Model, the object for working with our data type
const Todo = mongoose.model("Todo", todoSchema)

///////////////////////
// Exports
///////////////////////
module.exports = Todo