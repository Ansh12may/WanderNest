const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const { isAvailable } = require("../middleware.js");


module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut } = req.body;

  const listing = await Listing.findById(id);

  const available = await isAvailable(id, checkIn, checkOut);
  if (!available) {
    req.flash("error", "Dates not available");
    return res.redirect(`/listings/${id}`);
  }

  const days =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

  const totalPrice = days * listing.price;

  const booking = new Booking({
    listing: id,
    user: req.user._id,
    checkIn,
    checkOut,
    totalPrice
  });

  await booking.save();

 req.session.bookingSummary = {
  checkIn: booking.checkIn,
  checkOut: booking.checkOut,
  totalPrice: booking.totalPrice
};

req.flash("success", "Booking confirmed");
res.redirect(`/listings/${listing._id}`);


};


module.exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing");

  res.render("index", { bookings });
};



module.exports.myTrips = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });

  res.render("my", { bookings });

};




module.exports.cancelBooking = async (req, res) => {
  const { id } = req.params;

  // Find booking
  const booking = await Booking.findById(id);

  if (!booking) {
    req.flash("error", "Booking not found");
    return res.redirect("/bookings/my");
  }

  // Authorization: only owner can cancel
  if (!booking.user.equals(req.user._id)) {
    req.flash("error", "You are not authorized to cancel this booking");
    return res.redirect("/bookings/my");
  }

  // Update status instead of deleting
  booking.status = "cancelled";
  await booking.save();

  req.flash("success", "Booking cancelled successfully");
  res.redirect("/bookings/my");
};
