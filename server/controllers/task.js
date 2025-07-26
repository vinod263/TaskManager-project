const authMiddleware = require("../middleware/authmiddleware");
const {addTask, editTask, getTasks, deleteTask,getusertasks} = require("../services/task");
const router = require('express').Router();

router.post('/addtasks', authMiddleware, addTask);
router.put('/edittasks/:id', authMiddleware, editTask);
router.get('/gettasks/:id', authMiddleware, getTasks);
router.delete('/deletetasks/:id', authMiddleware, deleteTask);
router.get('/getusertasks', authMiddleware, getusertasks);

module.exports = router;