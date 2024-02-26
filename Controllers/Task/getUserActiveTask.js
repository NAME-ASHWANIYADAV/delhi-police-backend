const user = require("../Models/User")

exports.activeTask = async (req, res) => {

    const ActiveId = await user.ActiveTask.find({})
     
}