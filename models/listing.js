const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: String,

    image: {
      filename: {
        type: String,
        default: "listingimage"
      },
      url: {
        type: String,
        set: v =>
          v === ""
            ? "https://res.cloudinary.com/demo/image/upload/sample.jpg"
            : v
      }
    },

    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },

    category: {
      type: String,
      enum: ["trending", "budget", "luxury", "beach", "mountains"],
      default: "budget"
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    location: String,
    country: String,

    reviews: [{
      type: Schema.Types.ObjectId,
      ref: "Review"
    }],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

/* CASCADE DELETE REVIEWS */
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews }
    });
  }
});

module.exports = mongoose.model("Listing", listingSchema);
