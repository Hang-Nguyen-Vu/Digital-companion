import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User";

// Register new user
export const userRegistration = asyncHandler(async (req, res) => {
    // Extract the registration details from the request
    const { username, password, email, consent } = req.body;

    try {
    // Check whether all fields are available, if not, throw error
        if (!username || !password || !email || !consent) {
            res.status(400);
            throw new Error("Please add all fields!");
        };

    // Check if the details match those of an existing user by finding such an user in the database, if yes, ask the user to submit new details
        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            res.status(400);
            throw new Error(`User with this ${existingUser.username === username ? "username" : "email"} already exists!`)
        };

    // If the details submitted pass the two conditions above, start the process of creating a new user

        // Generate a hashed password to be stored in the database by generating a salt and hash on separate function
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Save the new user in the database
        const newUser = new UserModel({
            username,
            email,
            password: hash,
            consent
        });

        await newUser.save();

        // Respond to the user with a success message, including user details and access token
        res.status(201).json({
            success: true,
            response: {
                username: newUser.username,
                email: newUser.email,
                id: newUser._id,
                accessToken: newUser.accessToken
            }
        });

    // Handle any errors occuring during the registration
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message
        })
    };
});

// Log in existing user


// Retrieve one existing user


// Retrieve all users


// Delete an user
