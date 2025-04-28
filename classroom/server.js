const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");


app.get("/getcookies", (req,res) => {
    res.cookie("greet", "hello");
    res.send("Sent you some cookies");
})


app.get("/", (req,res) => {
    res.send("Hi, I am root");
});

app.use("/",users);

//Posts
//Index
app.get("/posts", (req,res) => {
    res.send("GET for posts");
})

//Show
app.get("/posts/:id", (req,res) => {
    res.send("GET for posts id");
})

//POST
app.post("/posts", (req,res) => {
    res.send("POST for posts");
})

//DELETE 
app.delete("/posts/:id", (req,res) => {
    res.send("DELETE for post id");
})


app.get(3000, () => {
    console.log("Server is listening to 3000");
});


app.listen(3000, () => {
    console.log("Server is listening to port 3000");
});