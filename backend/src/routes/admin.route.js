import express from "express";
import { getSchools, getUser } from "../controllers/admin.controller.js";
import { getTeachers } from "../controllers/admin.controller.js";
import { getStudents } from "../controllers/admin.controller.js";
import { getAllSchoolsgroupbyDistrict } from "../controllers/admin.controller.js";
import {
  signUpAdmin,
  signInAdmin,
  createSchoolProfile,
  createTeacherProfile,
} from "../controllers/admin.controller.js";
import {verifyAdminToken} from "../middlewares/admin.middleware.js";
const router = express.Router();

router.get("/me", verifyAdminToken, getUser);

router.get("/schools", getSchools);

router.get("/teachers", getTeachers);

router.get("/students", getStudents);

router.get("/create-school-profile", createSchoolProfile);

router.get("/districts", getAllSchoolsgroupbyDistrict);

router.post("/signup", signUpAdmin);

router.post("/signin", signInAdmin);

router.post("/create-school-profile", createSchoolProfile);

router.post("/create-teacher-profile", createTeacherProfile);

export default router;
