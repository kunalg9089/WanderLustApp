const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const{listingSchema,reviewSchema} = require("./schema.js");
// Models
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

// Routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

// MongoDB Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

// View Engine Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Root Route
app.get("/", (req, res) => {
    res.send("Hi, I am Root");
});

// Routes
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews); 

// Catch-all 404 Route
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Error Handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// Server Start
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
