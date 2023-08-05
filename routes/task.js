import express from "express";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

// create new taks
router.post("/tasks/new", isAuthenticated, newTask);

// show all my tasks
router.get("/tasks/my", isAuthenticated, getMyTasks);

// update the task
router.route("/tasks/:id").put(updateTask).delete(deleteTask);

export default router;