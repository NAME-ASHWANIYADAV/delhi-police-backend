const User = require("../../Models/User")
const Task = require("../../Models/Task")

exports.activeTask = async (req, res) => {

    const userID = req.userPayload.userID
    const user = await User.find({_id: userID})

    const activeTask = user.ActiveTask

    activeTask.foreach(async (element)=> {
    const taskData = await Task.find({_id: element})
    })
     
}
