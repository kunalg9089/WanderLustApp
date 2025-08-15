// seeds/index.js

const mongoose = require("mongoose");
const Listing = require("../app/models/listing"); // Import the Listing model
const initData = require("./data"); // Import your seed data

main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// Seed the database
const initDB = async () => {
  try {
    await Listing.deleteMany({}); // Clear existing listings
    
    // Default user ID (created by create-default-user.js script)
    const defaultUserId = "689ed5fb9db92c83fd86f964";
    
    // Add required geometry field and owner to each listing
    const listingsWithGeometry = initData.data.map(listing => ({
      ...listing,
      owner: defaultUserId,
      geometry: {
        type: 'Point',
        coordinates: [0, 0] // Default coordinates - you can update these later
      }
    }));
    
    await Listing.insertMany(listingsWithGeometry); // Insert seed listings
    console.log("Data was initialized successfully.");
    console.log(`Added ${listingsWithGeometry.length} listings with owner ID: ${defaultUserId}`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close(); // Always close the connection
  }
};

initDB();
