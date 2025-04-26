import express from "express";
import upload from "../config/multer.js";
import verifyTeacherToken from "../middlewares/teacher.middleware.js";
import {
  signInTeacher,
  createStudentProfile,
  getAllStudents,
  parseCsvFile,
  getUser,
  getStudentWeeklyHealthRecords,
  getAllHealthStatus,
  getStudentHealthDetails,
} from "../controllers/teacher.controller.js";
const router = express.Router();

router.post("/signin", signInTeacher);

router.post("/getAllStudents", verifyTeacherToken, getAllStudents);

router.post(
  "/create-student-profile",
  verifyTeacherToken,
  createStudentProfile,
);

router.post(
  "/upload-csv-file",
  upload.single("csvFile"),
  verifyTeacherToken,
  parseCsvFile,
);

router.post(
  "/weekly-report",
  verifyTeacherToken,
  getStudentWeeklyHealthRecords,
);

router.get("/me", verifyTeacherToken, getUser);

router.get("/health-status/all", verifyTeacherToken, getAllHealthStatus);

router.get("/health-details/all", verifyTeacherToken, getStudentHealthDetails);

export default router;
