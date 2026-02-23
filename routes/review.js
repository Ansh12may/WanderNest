const express = require("express");
const router = express.Router({mergeParams:true});
const WrapAsync = require("../utils/WrapAsync.js");
const listingSchema = require("../Schema.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../reviewSchema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const flash = require("connect-flash");
const {isLoggedIn,isReviewAuthor,validateReview} = require("../middleware.js");
const reviewController = require("../controllers/review.js");
 
//reviews
//post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  WrapAsync(reviewController.createReview)
);

//delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(reviewController.deleteReview)
);

module.exports = router;


