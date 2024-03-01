// gives the list of all the users
const User = require("../../Models/User")

exports.getUserList = async (req, res) => {
    
    try{
        const userData = await User.find({})

        if(!userData){
            res.status(500).json({
                success: false,
                message: "No user data available"
            })
        }else{
            console.log(res)
            res.json({
                status: true,
                userData: userData,
                message: "User Data retrieved successfully"
            })
        }

    }catch(e){
        console.log(e)
        res.status(400).json({
            success: false,
            error: e,
            message: "user data retrival failed - try again later"
        })
    }
   

    

}