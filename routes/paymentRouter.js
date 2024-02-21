import express from "express";
import { payment } from "../controllers/paymentController.js";
const router = express.Router();

router.post("/checkout" , payment);

export default router;