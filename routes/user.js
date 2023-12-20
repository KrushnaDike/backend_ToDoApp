import express from "express";
import { getAllUsers, getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

// Read Data
router.get("/all", getAllUsers); 

router.post("/login", login);

router.get("/logout", logout);

// Create Data
router.post("/new", register); 

router.get("/me", isAuthenticated, getMyProfile);

export default router;