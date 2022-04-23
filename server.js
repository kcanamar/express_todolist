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
// Schema the definition of our data type
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
}, {timestamps: true})

// Model, the object for working with our data type
const Todo = mongoose.model("Todo", todoSchema)

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
app.get("/", async (req, res) => {
    // go get todos
    const todos = await Todo.find({}).catch((err) => res.send(err))
    // redner index.ejs
    res.render("index.ejs", {todos})
})

// seed
app.get("/todo/seed", async (req, res) => {
    // delete all existing todos
    await Todo.deleteMany({}).catch((err) => res.send(err))
    // add your sample todos
    const todos = await Todo.create([
        {text: "eat breakfast", completed: false},
        {text: "eat lunch", completed: false},
        {text: "eat dinner", completed: false},
    ]).catch((err) => res.send(err))
    //send the todos as json
    res.json(todos)
})

// create
app.post("/todo", async (req, res) => {
    // create the todo
    await Todo.create(req.body).catch((err) => res.send(err))
    // redirect back to main page
    res.redirect("/")
})

// update
app.put("/todo/:id", async (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the todo to be updated
    const todo = await Todo.findById(id)
    // update the todos completed property
    todo.completed = true
    // save changes
    todo.save()
    // redirect back to main 
    res.redirect("/")
})
///////////////////////////
// Server Listener
///////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))