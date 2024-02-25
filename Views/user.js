const express = require("express")
const router = express.Router()
const authN = require("../middlewares/authN")

// this routes logs user into the app and generates a token and sends it to the user for further verification
const {generateOTP} = require("../Controllers/generateOTP")
router.get("/generateOTP", generateOTP)

// check if the user exists or not if exists returns userData aswell and also generates a JWT token
const {checkUser} = require("../Controllers/checkUser")
router.get('/checkUser', checkUser)

// create the user
const {createUser} = require("../Controllers/createUser")
router.get('/createUser', createUser)


// TODO:- //


// upon refresh of this particular page
// user now has the token ot verify themselves
// see completed tasks
const {completedTask} = require("../Controllers/Task/getUserCompletedTask")
router.get("/getCompletedTasks",authN, completedTask)

// see active task
const {activeTask} = require("../Controllers/Task/getUserActiveTask")
router.get("/getActiveTask",authN, activeTask)

//task completed
const {taskCompleted} = require("../Controllers/Task/taskCompleted")
router.post("/taskCompleted",authN, taskCompleted)

module.exports = router