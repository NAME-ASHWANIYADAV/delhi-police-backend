const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    PhoneNumber:{
        type:String,
        require:true,
    },
    DateOfBirth:{
        type:String,
        require:true,
    },
    Gender:{
        type:String,
        enum:["Male","Female","Others"],
    },
    RegistrationNumber:{
        type:Number,
        require:true,
    },
    OTP:{
       type:String,
       require:true,
    },
    UserRole:{
        type:String,
        enum:["User","Admin","Regulator", "MaterAdmin"],
    },
    ActiveTask:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'task'
    }],
    CompletedTask:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'task'
    }]


})

module.exports = mongoose.model("user", UserSchema);
