const task = require("../models/tasks");

const addTask = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const user = req.user;
      

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const newTask = new task({
            title,
            description,
            priority,
            status
        });

        await newTask.save();
        user.tasks.push(newTask._id);
        await user.save();
        return res.status(201).json({success: "Task added successfully", task: newTask });
        
    } catch (error) {
        return res.status(404).json({error:"internal server error"});
        
    }
}

// Edit Task
const editTask = async (req, res) => {
    try {
        const {id} = req.params;
        const { title, description, priority, status } = req.body;     

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const newTask = new task({
            title,
            description,
            priority,
            status
        });

     await task.findByIdAndUpdate(id,{
         title,
         description,
         priority,
         status
     });
        return res.status(201).json({success: "Task updated successfully", task: newTask });
    } catch (error) {
        return res.status(404).json({error:"internal server error"});
    }
};

//get tasks-->1
const getTasks = async (req, res) => {
    try {
        const {id} = req.params;
        const taskDetails = await task.findById(id);
        return res.status(200).json({ taskDetails });

    } catch (error) {
        return res.status(404).json({ error: "internal server error" });
    }
};

//delete task
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const taskDetails = await task.findByIdAndDelete(id);
        return res.status(200).json({success: "Task deleted successfully" });

    } catch (error) {
        return res.status(404).json({ error: "internal ddserver error" });
    }
};


const getusertasks= async (req, res) => {
  try {
    const user = req.user;
    const tasks = await task.find({ _id: { $in: user.tasks } });

    const categorizedTasks = [
      { yetToStart: tasks.filter((t) => t.status === 'yetToStart') },
      { inProgress: tasks.filter((t) => t.status === 'inProgress') },
      { completed: tasks.filter((t) => t.status === 'completed') },
    ];

    res.status(200).json({ tasks: categorizedTasks });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};


module.exports = {
    addTask,
    editTask,
    getTasks,
    deleteTask,
    getusertasks
};
