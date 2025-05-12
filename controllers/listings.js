const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}


module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}


module.exports.createListing = async (req, res,next) => {
let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
    let url = req.file.path;
    let filename = req.file.filename;
    const { listing } = req.body;
  
    const newListing =new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0].geometry;

    let savedlisting = await newListing.save();
    console.log(savedlisting);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  };


module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs", { listing });
};


module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
        req.flash("error", "You don't have permission to edit this listing.");
        return res.redirect(`/listings/${id}`);
    }

    if (!req.body.listing) {
        return res.status(400).json({ error: "Listing data is required" });
    }

    const updatedImage = {
        url: req.body.listing.image,
        filename: "file1", // You might want to handle file name dynamically
    };

    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        {
            ...req.body.listing,
            image: updatedImage,
        },
        { new: true, runValidators: true }
    );

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}