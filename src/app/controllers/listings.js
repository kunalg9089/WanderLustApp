const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

// Only create geocoding client if MAP_TOKEN exists
let geocodingClient = null;
if (mapToken && mapToken !== "undefined" && mapToken !== "") {
    try {
        geocodingClient = mbxGeocoding({ accessToken: mapToken });
    } catch (error) {
        console.warn("Failed to create Mapbox geocoding client:", error.message);
    }
}


module.exports.index = async (req, res) => {
    const { search, category } = req.query;
    let query = {};

    // Handle search functionality
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
            { country: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    // Handle category filtering
    if (category && category !== 'all') {
        query.category = category;
    }

    const allListings = await Listing.find(query);
    
    // Get unique categories for filter buttons
    const categories = await Listing.distinct('category');
    
    res.render("listings/index.ejs", { 
        allListings, 
        categories,
        currentSearch: search || '',
        currentCategory: category || 'all'
    });
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


module.exports.createListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;
        const { listing } = req.body;
        
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        
        // Only use geocoding if client is available
        if (geocodingClient) {
            try {
                let response = await geocodingClient.forwardGeocode({
                    query: req.body.listing.location,
                    limit: 1
                }).send();
                
                if (response.body.features && response.body.features.length > 0) {
                    newListing.geometry = response.body.features[0].geometry;
                } else {
                    // Fallback geometry if geocoding fails
                    newListing.geometry = {
                        type: 'Point',
                        coordinates: [0, 0]
                    };
                }
            } catch (geocodingError) {
                console.warn("Geocoding failed:", geocodingError.message);
                // Fallback geometry
                newListing.geometry = {
                    type: 'Point',
                    coordinates: [0, 0]
                };
            }
        } else {
            // Fallback geometry when no geocoding client
            newListing.geometry = {
                type: 'Point',
                coordinates: [0, 0]
            };
        }

        let savedlisting = await newListing.save();
        console.log(savedlisting);
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (error) {
        console.error("Error creating listing:", error);
        req.flash("error", "Failed to create listing. Please try again.");
        res.redirect("/listings/new");
    }
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
    try {
        console.log('Update listing request received:', req.params.id);
        console.log('Request body:', req.body);
        
        const { id } = req.params;
        
        // Validate listing ID
        if (!id) {
            req.flash("error", "Invalid listing ID");
            return res.redirect("/listings");
        }

        // Find the listing
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        // Check ownership
        if (listing.owner.toString() !== req.user._id.toString()) {
            req.flash("error", "You don't have permission to edit this listing.");
            return res.redirect(`/listings/${id}`);
        }

        // Validate request body
        if (!req.body.listing) {
            req.flash("error", "Listing data is required");
            return res.redirect(`/listings/${id}/edit`);
        }

        console.log('Updating listing fields...');

        // Update basic fields
        const updateData = {
            title: req.body.listing.title,
            description: req.body.listing.description,
            price: req.body.listing.price,
            location: req.body.listing.location,
            country: req.body.listing.country,
            category: req.body.listing.category
        };

        // Handle image update
        if (req.file) {
            console.log('New image uploaded:', req.file.filename);
            updateData.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        } else {
            // Keep existing image
            console.log('Keeping existing image');
            updateData.image = listing.image;
        }

        // Only update geometry if location changed and geocoding is available
        if (req.body.listing.location && 
            req.body.listing.location !== listing.location && 
            geocodingClient) {
            try {
                console.log('Updating geometry for new location:', req.body.listing.location);
                const response = await geocodingClient.forwardGeocode({
                    query: req.body.listing.location,
                    limit: 1
                }).send();

                if (response.body.features && response.body.features.length > 0) {
                    updateData.geometry = response.body.features[0].geometry;
                    console.log('Geometry updated successfully');
                }
            } catch (geoError) {
                console.error('Geocoding error (continuing without geometry update):', geoError.message);
                // Continue without updating geometry
            }
        }

        console.log('Final update data:', updateData);

        // Use findByIdAndUpdate for better performance and atomicity
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            updateData,
            { 
                new: true, 
                runValidators: true,
                context: 'query'
            }
        );

        if (!updatedListing) {
            throw new Error('Failed to update listing');
        }

        console.log('Listing updated successfully:', updatedListing._id);
        req.flash("success", "Listing Updated Successfully!");
        res.redirect(`/listings/${id}`);

    } catch (error) {
        console.error('Error updating listing:', error);
        
        // Provide more specific error messages
        let errorMessage = "Error updating listing. Please try again.";
        
        if (error.name === 'ValidationError') {
            errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
        } else if (error.name === 'CastError') {
            errorMessage = "Invalid listing ID format";
        } else if (error.code === 11000) {
            errorMessage = "A listing with this title already exists";
        }
        
        req.flash("error", errorMessage);
        res.redirect(`/listings/${req.params.id}/edit`);
    }
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