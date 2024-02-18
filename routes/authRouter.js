import express from "express";
import { login, register, sendLink } from "../controllers/authController.js";
const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);
router.post("/sendLink" , sendLink);

export default router;