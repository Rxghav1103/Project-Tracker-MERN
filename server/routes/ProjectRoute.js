const express = require("express");
const router = express.Router();

const {
  createProject,
  getProject,
  getProjectName,
  getDetails,
  addTask,
  deleteTask,
  moveTask
} = require("../controllers/Project");

router.post("/create", createProject); // creates a project
router.post("/get", getProject); // gets a project (requires projectID and password)

router.post("/getName", getProjectName);
router.get("/get/:id", getDetails);

router.post("/add/:pid", addTask);

router.delete("/delete/:pid", deleteTask);

router.put("/move/:pid", moveTask);

module.exports = router;
