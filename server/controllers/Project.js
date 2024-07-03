const Project = require("../models/projectSchema");

const createProject = async (req, res) => {
  try {
    const { name, id, password } = req.body;
    const project = await Project.create({ name, projectID: id, password });
    res.status(200).json({ message: "Project Created Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Intenal Server Error" });
  }
};

const getProject = async (req, res) => {
  try {
    const { id, password } = req.body;
    const project = await Project.findOne({ projectID: id, password });
    if (project) {
      res.status(200).json({ project });
    } else {
      res.status(400).json({ message: "Project not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Intenal Server Error" });
  }
};

const getProjectName = async (req, res) => {
  try {
    const { id } = req.body;
    const project = await Project.findOne({ projectID: id });
    if (project) {
      res.status(200).json({ name: project.name });
    } else {
      res.status(400).json({ message: "Project not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Intenal Server Error" });
  }
};

const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ projectID: id });
    if (project) {
      res.status(200).json({ project });
    } else {
      res.status(400).json({ message: "Project not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Intenal Server Error" });
  }
};

const addTask = async (req, res) => {
  try {
    const { pid } = req.params;
    const project = await Project.findOne({ projectID: pid });

    const { toDo, inProgress, completed } = project;
    const { id, text, body, type } = req.body;

    const task = { id, text, body };
    if (type === "todo") {
      project.toDo = [...toDo, task];
    } else if (type === "inProgress") {
      project.inProgress = [...inProgress, task];
    } else if (type === "completed") {
      project.completed = [...completed, task];
    } else {
      res.status(400).json({ message: "Invalid Type" });
      return;
    }
    await project.save();
    res.status(200).json({ project });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Intenal Server Error" });
  }
};


const deleteTask = async ( req, res) => {
    try {
        const { pid } = req.params;
        const project = await Project.findOne({ projectID: pid });
        const { toDo, inProgress, completed } = project;
        const { id, type } = req.body;
        if (type === "todo") {
            project.toDo = toDo.filter((task) => task.id !== id);
        } else if (type === "inProgress") {
            project.inProgress = inProgress.filter((task) => task.id !== id);
        } else if (type === "completed") {
            project.completed = completed.filter((task) => task.id !== id);
        } else {
            res.status(400).json({ message: "Invalid Type" });
            return;
        }
        await project.save();
        res.status(200).json({ project });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Intenal Server Error" });
    }
}


const moveTask = async (req, res) => {
    try {
        const { pid } = req.params;
        const { id, source, target } = req.body;

        const project = await Project.findOne({ projectID: pid });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const { toDo, inProgress, completed } = project;
        let taskToMove;

        switch (source) {
            case "todo":
                taskToMove = toDo.find((task) => task.id === id);
                if (!taskToMove) {
                    return res.status(404).json({ message: "Task not found in toDo" });
                }
                project.toDo = toDo.filter((task) => task.id !== id);
                break;
            case "inProgress":
                taskToMove = inProgress.find((task) => task.id === id);
                if (!taskToMove) {
                    return res.status(404).json({ message: "Task not found in inProgress" });
                }
                project.inProgress = inProgress.filter((task) => task.id !== id);
                break;
            case "completed":
                taskToMove = completed.find((task) => task.id === id);
                if (!taskToMove) {
                    return res.status(404).json({ message: "Task not found in completed" });
                }
                project.completed = completed.filter((task) => task.id !== id);
                break;
            default:
                return res.status(400).json({ message: "Invalid source" });
        }

        switch (target) {
            case "todo":
                project.toDo = [...toDo, taskToMove];
                break;
            case "inProgress":
                project.inProgress = [...inProgress, taskToMove];
                break;
            case "completed":
                project.completed = [...completed, taskToMove];
                break;
            default:
                return res.status(400).json({ message: "Invalid target" });
        }

        await project.save();
        res.status(200).json({ project });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
  createProject,
  getProject,
  getProjectName,
  getDetails,
  addTask,
  deleteTask,
  moveTask
};
