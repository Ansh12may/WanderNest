const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  category: Joi.string()
    .valid("budget", "trending", "luxury", "beach", "mountains")
    .required()
}).required()

});

module.exports =  {listingSchema} ;
