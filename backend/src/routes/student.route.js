import express from "express";
import {
  getAIChatResponse,
  getAllWeeklyHealthRecords,
  getUser,
  signInStudent,
} from "../controllers/student.controller.js";
import { verifyStudentToken } from "../middlewares/student.middleware.js";
import { getHealthStatus } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/signin", signInStudent);

router.get("/me", verifyStudentToken, getUser);
router.get("/ai/chat", verifyStudentToken, getAIChatResponse);
router.get(
  "/weekly-health-records/all",
  verifyStudentToken,
  getAllWeeklyHealthRecords,
);
router.get("/health-status", verifyStudentToken, getHealthStatus);

export default router;
