const User = require("../../Models/User")
const Task = require("../../Models/Task")
// exports.activeTask = async (req, res) => {
//     const ActiveId = await user.ActiveTask.find()
//     // ActiveId.forEach(element => {
//     //     console.log( "JFGJHGHGJGG%%%%%%%%%%%%",element._id)

//     // });
//     res.json(ActiveId);
// }

exports.activeTask = async (req, res) => {
    // const ActivetaskID = req.params.id
    // const ActiveId = await user.ActiveTask.find({_id:ActivetaskID}).populate();
    // res.json(ActiveId);4

    const userID = req.userPayload.userID
    const user = await User.find({_id: userID})

    const activeTask = user.ActiveTask

     activeTask.foreach(async (element)=> {
         const taskData = await Task.find({_id: element})
    })
    }