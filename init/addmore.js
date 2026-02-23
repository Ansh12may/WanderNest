const mongoose = require("mongoose");
const path = require("path");
const Listing = require("../models/listing");
const User = require("../models/user");
const { autoListings } = require("./autolisting");
const fetch = require("node-fetch");

// ✅ Ensure correct .env loading
require("dotenv").config({
  path: path.join(__dirname, "../.env")
});

// ✅ Ensure fetch exists in Node
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderNest";



/* ------------------ GEOCODING ------------------ */
async function geocodeLocation(location, country) {
  const query = `${location}, ${country}`;

  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
    query
  )}.json?key=${process.env.MAPTILER_KEY}`;

  const res = await fetch(url);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Geocoding API error: ${text}`);
  }

  const data = JSON.parse(text);

  if (!data.features || data.features.length === 0) {
    throw new Error(`No coordinates found for ${query}`);
  }

  return data.features[0].geometry; // GeoJSON
}

/* ------------------ MAIN ------------------ */
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ DB connected");

  // 1️⃣ Find or create demo user
  let user = await User.findOne();
  if (!user) {
    user = new User({
      username: "demoUser",
      email: "demo@example.com",
    });
    await User.register(user, "password123");
    console.log("✅ Demo user created");
  }

  // 2️⃣ Build listings
  const finalListings = [];

  for (const listing of autoListings) {
    const geometry = await geocodeLocation(
      listing.location,
      listing.country
    );

    finalListings.push({
      ...listing,
      owner: user._id,
      geometry,
    });

    console.log(`📍 Geocoded: ${listing.title}`);
  }

  // 3️⃣ Insert into DB
  await Listing.insertMany(finalListings);
  console.log("🌱 Listings added successfully");

  await mongoose.connection.close();
}

main().catch(err => {
  console.error("❌ Error:", err.message);
  mongoose.connection.close();
});
