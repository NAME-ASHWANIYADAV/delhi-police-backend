const User = require("../Models/User")
require("dotenv").config()
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    try{

        // getting data from request body 
        const {firstName, lastName, mobileNumber} = req.body
        let token
        // check if any of the input field is empty or not 
        if(!firstName || !lastName || !mobileNumber){
            return res.status(400).json({
                success: false,
                message: "All the fields must be filled properly"
            })
        }

        // check if the user already exist - (interact with the database using the User model)
        const existingUser = await User.findOne({mobileNumber: mobileNumber})
        // console.log/("existing user-")
        // console.log(existingUser)
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exist try logging in..."
            })
        }

        // userCreation 
        console.log("user creation Started")
            try{
                const user = await User.create({
                    firstName,
                    lastName,
                    mobileNumber,
                })
                console.log(user)

                // creating a payload for the token
                const payload = {
                    id: user._id,
                    mobileNumber: user.mobileNumber,
                    userRole: user.userRole
                }

                token = jwt.sign(payload, process.env.JWT_SECRET)

                console.log("token creation successful...")            
                console.log("token " + token)

            }catch(e) {
                res.json({
                    success: false,
                    message: "user creation failed",
                    cause: e
                })
            }
            console.log("user Created")

            // generating token for user
            
            return res.status(200).json({
                success: true,
                token: token,
                message: `User created successfully`
            })

    }catch(err){
        res.json({
            success: false,
            message: "user creation failed",
            cause: err
        })
    }
}