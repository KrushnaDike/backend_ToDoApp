import express from "express";
import {
  deleteTask,
  getMyTasks,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

// create new taks
router.post("/task/new", isAuthenticated, newTask);

// show all my tasks
router.get("/task/my", isAuthenticated, getMyTasks);

// update the task
router
    .route("/task/:id")
    .put(updateTask)
    .delete(deleteTask);

export default router;
