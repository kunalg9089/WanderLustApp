// Script to populate database with sample listings
// Run this script to add sample data for testing search and filtering functionality

const mongoose = require('mongoose');
const Listing = require('../app/models/listing');
const sampleListings = require('./sampleData');

// MongoDB connection
const dbUrl = process.env.ATLASDB_URL;

async function populateSampleData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbUrl);
        console.log('Connected to MongoDB');

        // Clear existing listings (optional - comment out if you want to keep existing data)
        // await Listing.deleteMany({});
        // console.log('Cleared existing listings');

        // Check if we already have sample data
        const existingCount = await Listing.countDocuments();
        if (existingCount > 0) {
            console.log(`Database already has ${existingCount} listings. Skipping sample data population.`);
            console.log('To add sample data, first clear the database or modify this script.');
            return;
        }

        // Add sample listings
        const listingsWithOwner = sampleListings.map(listing => ({
            ...listing,
            owner: '507f1f77bcf86cd799439011', // You'll need to replace this with a real user ID
            geometry: {
                type: 'Point',
                coordinates: [0, 0] // Default coordinates - you can update these
            }
        }));

        const result = await Listing.insertMany(listingsWithOwner);
        console.log(`Successfully added ${result.length} sample listings to the database!`);

        // Display summary by category
        const categories = await Listing.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        console.log('\nSample data summary by category:');
        categories.forEach(cat => {
            console.log(`${cat._id}: ${cat.count} listings`);
        });

    } catch (error) {
        console.error('Error populating sample data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script if called directly
if (require.main === module) {
    populateSampleData();
}

module.exports = populateSampleData; 