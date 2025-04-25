// Package imports
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// Setup imports
import { connectDB } from "./config/db.js";
import { setUpCloudinary } from "./config/cloudinary.js";

// Router imports
import adminRouter from "./routes/admin.route.js";
import schoolRouter from "./routes/school.route.js";
import teacherRouter from "./routes/teacher.route.js";
import studentRouter from "./routes/student.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();
setUpCloudinary();

app.get("/api/health", (_req, res) => {
  return res.status(200).send({
    health: "OK",
    message: "Server is running",
  });
});

// Routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/school", schoolRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/student", studentRouter);

app.use((err, _req, res, _next) => {
  return res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
