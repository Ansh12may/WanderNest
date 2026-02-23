const Listing = require("../models/listing.js");
const fetch = require("node-fetch");


  //GEOCODING HELPER

async function geocodeLocation(location, country) {
  const query = `${location}, ${country}`;

  const res = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${process.env.MAPTILER_KEY}`
  );

  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("Location not found");
  }

  return data.features[0].geometry;
}

//  INDEX + SEARCH + CATEGORY

module.exports.index = async (req, res) => {
  const { q, category = "all", sort } = req.query;

  let filter = {};

  // SEARCH LOGIC
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } }
    ];
  }

  // CATEGORY FILTER
  if (category !== "all") {
    filter.category = category;
  }

  let query = Listing.find(filter);

  // PRICE SORTING
  if (sort === "price_asc") {
    query = query.sort({ price: 1 });
  } else if (sort === "price_desc") {
    query = query.sort({ price: -1 });
  }

  const listings = await query;

  res.render("index.ejs", {
    allListings: listings,
    q,
    category,
    sort
  });
};

//  NEW LISTING FORM
module.exports.renderNewFrom = (req, res) => {
  res.render("new.ejs");
};


//  CREATE LISTING

module.exports.createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      country,
      category
    } = req.body.listing;

    const geometry = await geocodeLocation(location, country);

    const listing = new Listing({
      title,
      description,
      price,
      location,
      country,
      category,
      geometry
    });

    //  FIX: explicitly assign image
    if (req.file) {
      listing.image = {
        url: req.file.path,        // Cloudinary URL
        filename: req.file.filename
      };
    }

    listing.owner = req.user._id;

    await listing.save();

    req.flash("success", "New Listing Created");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/listings");
  }
};

// EDIT FORM
module.exports.editRenderForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("edit.ejs", { listing });
};

  //  UPDATE LISTING

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  // get data correctly
  const { title, description, price, country, category } =
    req.body.listing;

  // update basic fields
  const listing = await Listing.findByIdAndUpdate(
    id,
    { title, description, price, country, category },
    { new: true, runValidators: true }
  );

  //  update image separately
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await listing.save();
  }

  req.flash("success", "Listing updated successfully");
  res.redirect(`/listings/${id}`);
};



  // SHOW LISTING

module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: { path: "author" }
    });

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("show.ejs", { listing });
};


  //  DELETE LISTING

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Successfully deleted listing");
  res.redirect("/listings");
};


