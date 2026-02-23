const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const {listingSchema}= require("../Schema.js");
const ExpressError = require("../utils/ExpressError.js");
 //const Listing = require("../models/listing.js");
const {isLoggedIn }= require("../middleware.js");
const {isOwner,validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const {storage} = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

//Index Route
router.get("/",WrapAsync(listingController.index));


//New Route
router.get("/new",isLoggedIn,listingController.renderNewFrom);

//create route
 router.post("/",isLoggedIn, upload.single("image"),validateListing,WrapAsync(listingController.createListing));


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,WrapAsync(listingController.editRenderForm));

//update route

router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    WrapAsync(listingController.updateListing)
);


//show Route or view Route
router.get("/:id",WrapAsync(listingController.showListing));

//delete route
router.delete("/:id",isLoggedIn,isOwner,WrapAsync(listingController.deleteListing));





module.exports = router;