import express from "express";
import { root } from "../controllers/admin.controller.js";
import { signUpAdmin ,signInAdmin,createSchoolProfile,createTeacherProfile} from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/", root);

router.post("/signup",signUpAdmin)

router.post("/signin",signInAdmin)

router.post("/create-school-profile",createSchoolProfile)

router.post("/create-teacher-profile",createTeacherProfile)

export default router;
