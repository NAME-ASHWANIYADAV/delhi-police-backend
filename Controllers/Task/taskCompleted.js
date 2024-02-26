
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path accordingly

router.post('/completeTask/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assume taskId is sent in the request body
        const taskId = req.params.taskId;

        // Check if the task exists in the ActiveTask array
        const taskIndex = user.ActiveTask.indexOf(taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found in ActiveTask' });
        }

        // Remove the task from ActiveTask
        user.ActiveTask.splice(taskIndex, 1);

        // Add the task to CompletedTask
        user.CompletedTask.push(taskId);

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Task completed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
