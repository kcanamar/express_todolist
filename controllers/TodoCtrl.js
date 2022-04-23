////////////////////////
// Setup - Import deps
////////////////////////
const express = require("express")
const router = express.Router()
const todoAction = require("./TodoAction")
///////////////////////
// Declare Routes and Routers 
///////////////////////
router.get("/", todoAction.index)
router.get("/seed", todoAction.seed)
router.post("/", todoAction.create)
router.put("/:id", todoAction.update)
///////////////////////
// Exports
///////////////////////
module.exports = router