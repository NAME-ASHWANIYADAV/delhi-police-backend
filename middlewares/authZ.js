

exports.authZ = async (req, res, next) => {
    // FIXME: temporary patch remove in production
    const {userRole} = req.userPayload || {userRole: "REGULATOR"}
    try {
        if(userRole === "REGULATOR"){
            next()
        }else{
            res.status(500).json({
                success: false,
                message: "user not authorized to access the rpute"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Errpr in authorization - try again later"
        })
    }
    
}