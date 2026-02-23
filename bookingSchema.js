const Joi = require("joi");
module.exports.bookingSchema = Joi.object({
  checkIn: Joi.date().required(),
  checkOut: Joi.date().greater(Joi.ref("checkIn")).required()
});
