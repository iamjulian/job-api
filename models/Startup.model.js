const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");
// const { type } = require("os");

const startupSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },

    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },
    about: {
        type: String,
        trim:true,
        minLength: [10, "About you must be at least 10 characters."],
        maxLength: [500, "About you is too large"],
    },

    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },

    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },

    businessPlans: {
        type: String,
        required: [true, "Please provide a business plan"],
        trim: true,
        minLength: [10, "Business plan must be at least 3 characters."],
        maxLength: [1000, "Business plan is too large"],
      },
  
      businessFile: {type:String,},
  
      comments: {},

    confirmationToken: String,
    confirmationTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

// startupUserSchema.methods.generateConfirmationToken = function () {
//   const token = crypto.randomBytes(32).toString("hex");

//   this.confirmationToken = token;

//   const date = new Date();

//   date.setDate(date.getDate() + 1);
//   this.confirmationTokenExpires = date;

//   return token;
// };

const Startup = mongoose.model("Startup", startupSchema);

module.exports = Startup;