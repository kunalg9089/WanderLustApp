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
    await Listing.insertMany(initData.data); // Insert seed listings
    console.log("Data was inititlaized successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close(); // Always close the connection
  }
};

initDB();
