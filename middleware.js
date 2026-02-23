const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

const {  reviewSchema } = require("./reviewSchema.js"); 

const {listingSchema}  = require("./Schema.js");
const Booking = require("./models/booking.js");
const ExpressError = require("./utils/ExpressError.js");



module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirecturl save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listing");
         return res.redirect("/auth/login");
    }
    next();

}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not authorized to do that");
        return res.redirect(`/listings/${id}`);
    }

    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized to do that");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validateReview =(req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    }

    next();
};


module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    }

    next();
};


//booking middleware

module.exports.isAvailable = async (listingId, checkIn, checkOut) => {
  const conflict = await Booking.findOne({
    listing: listingId,
    status: "confirmed",
    checkIn: { $lt: checkOut },
    checkOut: { $gt: checkIn }
  });

  return !conflict;
};
