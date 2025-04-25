const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

// Middleware to validate listing input using Joi schema
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Index Route - Show all listings
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New Route - Show form to create a new listing
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Create Route - Handle POST request to create new listing
router.post("/", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// Show Route - Show a specific listing
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews"); 
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}));

// Edit Route - Show edit form
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

// Update Route - Handle PUT request to update listing
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;

    if (!req.body.listing) {
        return res.status(400).json({ error: "Listing data is required" });
    }

    const updatedImage = {
        url: req.body.listing.image,
        filename: "file1",
    };

    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        {
            ...req.body.listing,
            image: updatedImage,
        },
        { new: true, runValidators: true }
    );

    res.redirect(`/listings/${id}`);
}));

// Delete Route - Delete a listing
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;
