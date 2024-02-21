import express from "express";
import { login, register, resetPassword, sendLink } from "../controllers/authController.js";
const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);
router.post("/sendlink" , sendLink);
router.put("/resetpassword/:id/:token" , resetPassword);

export default router;  