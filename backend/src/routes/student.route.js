import express from "express";
import {
  getAIChatResponse,
  getUser,
  signInStudent,
} from "../controllers/student.controller.js";
import { verifyStudentToken } from "../middlewares/student.middleware.js";

const router = express.Router();

router.post("/signin", signInStudent);

router.get("/me", verifyStudentToken, getUser);
router.get("/ai/chat", verifyStudentToken, getAIChatResponse);

export default router;
