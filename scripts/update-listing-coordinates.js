const mongoose = require('mongoose');
const Listing = require('../src/app/models/listing');

// MongoDB connection
const dbUrl = process.env.ATLASDB_URL || 'mongodb://127.0.0.1:27017/wanderlust';

// Real coordinates for each location
const locationCoordinates = {
    'Malibu': [-118.6919, 34.0259],
    'New York City': [-74.0060, 40.7128],
    'Aspen': [-106.8236, 39.1911],
    'Florence': [11.2558, 43.7696],
    'Portland': [-122.6765, 45.5152],
    'Cancun': [-86.8515, 21.1743],
    'Lake Tahoe': [-120.0324, 39.0968],
    'Los Angeles': [-118.2437, 34.0522],
    'Bali': [115.1889, -8.4095],
    'Paris': [2.3522, 48.8566],
    'Tokyo': [139.6917, 35.6895],
    'Sydney': [151.2093, -33.8688],
    'Rio de Janeiro': [-43.1729, -22.9068],
    'Cape Town': [18.4241, -33.9249],
    'Marrakech': [-7.9816, 31.6295],
    'Istanbul': [28.9784, 41.0082],
    'Barcelona': [2.1734, 41.3851],
    'Amsterdam': [4.9041, 52.3676],
    'Prague': [14.4378, 50.0755],
    'Vienna': [16.3738, 48.2082],
    'Budapest': [19.0402, 47.4979],
    'Krakow': [19.9454, 50.0647],
    'Warsaw': [21.0122, 52.2297],
    'Stockholm': [18.0686, 59.3293],
    'Oslo': [10.7522, 59.9139],
    'Copenhagen': [12.5683, 55.6761],
    'Helsinki': [24.9384, 60.1699],
    'Reykjavik': [-21.8278, 64.1466]
};

async function updateListingCoordinates() {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB');

        // Get all listings
        const listings = await Listing.find({});
        console.log(`Found ${listings.length} listings to update`);

        let updatedCount = 0;

        for (const listing of listings) {
            // Find coordinates based on location
            const coordinates = locationCoordinates[listing.location];
            
            if (coordinates) {
                // Update the listing with real coordinates
                await Listing.findByIdAndUpdate(listing._id, {
                    geometry: {
                        type: 'Point',
                        coordinates: coordinates
                    }
                });
                console.log(`✅ Updated "${listing.title}" with coordinates: [${coordinates[0]}, ${coordinates[1]}]`);
                updatedCount++;
            } else {
                // Use a default location (New York City) for unknown locations
                const defaultCoords = [-74.0060, 40.7128];
                await Listing.findByIdAndUpdate(listing._id, {
                    geometry: {
                        type: 'Point',
                        coordinates: defaultCoords
                    }
                });
                console.log(`⚠️  Updated "${listing.title}" with default coordinates: [${defaultCoords[0]}, ${defaultCoords[1]}]`);
                updatedCount++;
            }
        }

        console.log(`\n🎉 Successfully updated ${updatedCount} listings with real coordinates!`);
        console.log('\n📍 Locations now have proper coordinates:');
        Object.entries(locationCoordinates).forEach(([location, coords]) => {
            console.log(`   ${location}: [${coords[0]}, ${coords[1]}]`);
        });

    } catch (error) {
        console.error('Error updating coordinates:', error);
    } finally {
        mongoose.connection.close();
    }
}

updateListingCoordinates();
