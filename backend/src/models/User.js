import mongoose from "mongoose";
var crypto = require("crypto");

// Create a new Mongoose schema that defines the structure of a user document in the MongoDB collection
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 5,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        consent: { // whether the user agrees to terms and conditions when signing up
            type: Boolean,
            required: true
        },
        accessToken: {
            type: String,
            default: () => crypto.randomBytes(128).toString("hex") // to generate a new random string
        }
    },
    {
        timestamps: true,
    }
);

// Create a Mongoose model based on "userSchema" for users' collection
export const UserModel = mongoose.model("User", userSchema);
