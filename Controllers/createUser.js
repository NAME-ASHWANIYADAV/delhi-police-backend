const User = require("../Models/User");
require("dotenv").config();
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    let token; // Declare token outside the try-catch block

    try {
        const { firstName, lastName, mobileNumber, userRole } = req.body;

        if (!firstName || !lastName || !mobileNumber) {
            return res.status(400).json({
                success: false,
                message: "All the fields must be filled properly"
            });
        }

        const existingUser = await User.findOne({ mobileNumber: mobileNumber });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Try logging in."
            });
        }

        console.log("User creation started");

        try {
            const user = await User.create({
                firstName,
                lastName,
                mobileNumber,
                userRole
            });

            const payload = {
                id: user._id,
                userRole: user.userRole
            };

            token = jwt.sign(payload, process.env.JWT_SECRET);
            console.log("Token creation successful...");
            console.log("Token: " + token);
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "User creation failed",
                cause: e
            });
        }

        console.log("User created");

        // Check if token is defined before using it in the response
        if (token) {
            return res.status(200).json({
                success: true,
                token: token,
                message: "User created successfully"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Token not generated"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User creation failed",
            cause: err
        });
    }
};
