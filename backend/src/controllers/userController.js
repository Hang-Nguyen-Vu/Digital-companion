import asyncHandler from "express-async-handler";

// Register new user
export const userRegistration = asyncHandler(async (req, res) => {
    // Extract the registration details from the request

    // Check whether all fields are available, if not, throw error

    // Check if the details match those of an existing user by finding such an user in the database, if yes, ask the user to submit new details

    // If the details submitted pass the two conditions above, start the process of creating a new user

        // Generate a hashed password to be stored in the database

        // Save the new user in the database

        // Respond to the user with a success message, including user details and access token

    // Handle any errors occuring during the registration
})

// Log in existing user


// Retrieve one existing user


// Retrieve all users


// Delete an user
