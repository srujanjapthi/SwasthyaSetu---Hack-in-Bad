import express from "express";
import {
  getAIChatResponse,
  getUser,
  root,
  signInStudent,
} from "../controllers/student.controller.js";
import { verifyStudentToken } from "../middlewares/student.middleware.js";

const router = express.Router();

router.get("/", root);

router.get("/me", verifyStudentToken, getUser);

router.post("/signin", signInStudent);

router.get("/ai/chat", getAIChatResponse);

export default router;
