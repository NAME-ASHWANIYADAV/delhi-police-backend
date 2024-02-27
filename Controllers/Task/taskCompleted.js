
const Task = require('../models/Task'); // Import your Task Mongoose model
const User = require('../../Models/User')

exports.completeTask = async (req, res) => {
    try {
        //const { userId, taskIds, completionTime } = req.body;

        // Find the active task for the given user
        const userID = req.body
        const userId = await User.find({ _id:userID });
        const activeTask = userId.ActiveTask

        if (!activeTask) {
            return res.status(404).json({ message: 'Active task not found for the user' });
        }

        // Check if the received task IDs match the active task ID
        const matchingTaskId = taskIds.find(taskId => taskId === activeTask.taskId);

        if (!matchingTaskId) {
            return res.status(400).json({ message: 'No matching task ID found' });
        }

        // Check if completion time has passed
        if (new Date(completionTime) > new Date()) {
            return res.status(400).json({ message: 'Completion time has not passed yet' });
        }

        // Update the status of the task to 'completed'
        activeTask.status = 'completed';

        // Save the updated task to the database
        await activeTask.save();

        res.status(200).json({ message: 'Task completed and updated in the database' });
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
