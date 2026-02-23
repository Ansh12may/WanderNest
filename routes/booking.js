const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware.js");
const bookingsController = require("../controllers/booking.js");

router.post(
  "/listings/:id/book",
  isLoggedIn,
  bookingsController.createBooking
);

// router.get("/my", isLoggedIn, bookingsController.myBookings);

router.get(
  "/my",
  isLoggedIn,
  bookingsController.myTrips
);

router.put("/:id/cancel", isLoggedIn, bookingsController.cancelBooking);



module.exports = router;
