import express from "express";
import upload from "../config/multer.js";
import verifyTeacherToken from "../middlewares/teacher.middleware.js";
import {
  signInTeacher,
  createStudentProfile,
  getAllStudents,
  parseCsvFile,
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

export default router;
