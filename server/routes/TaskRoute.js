const express = require("express")
const router = express.Router()

const { createTask, getTask, getTaskById, getTaskByUserId, updateTask, completeTask } = require("../controllers/Tasks")

router.get('/', getTask) // gets all tasks
router.get('/:id', getTaskById) // gets a specific task based on task id
router.post('/:id/complete', completeTask) // completes a specific task based on task id
router.get('/user/:id', getTaskByUserId) // gets all tasks based on user id
router.post('/create', createTask) // creates a task
router.post('/update/:id', updateTask) // updates a task based on task id

module.exports = router