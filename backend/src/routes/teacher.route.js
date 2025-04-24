import express from "express";
import { root,signInTeacher ,createStudentProfile} from "../controllers/teacher.controller.js";

const router = express.Router();

router.get("/", root);

router.post("/signin", signInTeacher);

router.post("/create-student-profile",createStudentProfile)

export default router;
