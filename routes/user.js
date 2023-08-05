import express from "express";
import { getAllUsers, getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

// Read Data
router.get("/users/all", getAllUsers); 

router.post("/users/login", login);

router.get("/users/logout", logout);

// Create Data
router.post("/users/new", register); 

router.get("/me", isAuthenticated, getMyProfile);

export default router;