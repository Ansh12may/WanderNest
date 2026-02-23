const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const Listing = require("../models/listing");
const User = require("../models/user");   // 👈 ADD THIS
const { data: sampleListings } = require("./data");

/* ------------------ GEOCODING ------------------ */
async function geocodeLocation(location, country) {
  const query = `${location}, ${country}`;

  const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(
      query
    )}.json?key=${process.env.MAPTILER_KEY}`
  );

  const data = await response.json();

  if (!data.features || data.features.length === 0) {
    throw new Error(`Geocoding failed for ${query}`);
  }

  return data.features[0].geometry;
}

/* ------------------ SEED DATABASE ------------------ */
async function seedDB() {
  await Listing.deleteMany({});
  console.log("🗑️ Old listings deleted");

  // 🔥 Get an existing user from DB
  const user = await User.findOne();

  if (!user) {
    throw new Error("No user found. Please create a user first.");
  }

  for (let item of sampleListings) {
    const geometry = await geocodeLocation(
      item.location,
      item.country
    );

    const listing = new Listing({
      ...item,
      owner: user._id,  // 👈 FIXED
      geometry,
    });

    await listing.save();
    console.log(`✅ Added: ${item.title}`);
  }
}

/* ------------------ CONNECT & RUN ------------------ */
async function main() {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("✅ MongoDB Atlas connected");

    await seedDB();

    console.log("🌱 Database seeded successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error:", err);
    mongoose.connection.close();
  }
}

main();