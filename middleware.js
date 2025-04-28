const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const{ listingSchema,reviewSchema } = require("./schema.js");

// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Save the original URL to redirect back after login
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
};

// Middleware to save the redirect URL in case of failed authentication
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware to check if the user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    // if (!listing) {
    //     // Handle case where listing is not found
    //     req.flash("error", "Listing not found!");
    //     return res.redirect("/listings");
    // }

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.validateListing = (req,res,next) => {
    const validateListing = (req, res, next) => {
        let { error } = listingSchema.validate(req.body);
        if (error) {
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400, errMsg);
        } else {
            next();
        }
    };
}

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


module.exports.isreviewAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);

    // if (!listing) {
    //     // Handle case where listing is not found
    //     req.flash("error", "Listing not found!");
    //     return res.redirect("/listings");
    // }

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};