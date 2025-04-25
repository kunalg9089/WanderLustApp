const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/",
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                    : v,
        },
    },
    price: {
        type: Number,
        min: 0,
    },
    location: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;