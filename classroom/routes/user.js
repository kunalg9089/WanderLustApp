const express = require("express");
const route = express.Router();


//Index
router.get("/posts", (req,res) => {
    res.send("GET for posts");
})

//Show
router.get("/posts/:id", (req,res) => {
    res.send("GET for posts id");
})

//POST
router.post("/posts", (req,res) => {
    res.send("POST for posts");
})

//DELETE 
router.delete("/posts/:id", (req,res) => {
    res.send("DELETE for post id");
})

module.exports = router;