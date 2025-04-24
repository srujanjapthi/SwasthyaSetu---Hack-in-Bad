import express from "express";
import { root ,signInStudent} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", root);

router.post("/signin", signInStudent);

export default router;
