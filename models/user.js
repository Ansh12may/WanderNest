const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;


//password and username will be defined automatically by passportLocalMongoose so we dont need to write
//it in schema
const userSchema = new Schema({
    googleId: String,
    email:{
        type:String,
        required:true,
        unique:true,
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);



