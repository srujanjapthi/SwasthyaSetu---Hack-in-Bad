import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import { ai } from "../config/ai.js";
import { getPhysicalHealthReportsPrompt } from "../constants/prompts.js";
import WeeklyHealthRecord from "../models/weekly-health-records.model.js";

export const signInStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        message: "Student doesn't exist. Please Sign-up",
      });
    }

    if (password !== student.password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("student_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      studentId: student._id,
      message: "Student Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAIChatResponse = async (req, res, next) => {
  try {
    const studentId = req.studentId;
    const student = await Student.findById(studentId);
    const lastTwoWeekRecords = await WeeklyHealthRecord.find({
      email: student.email,
    })
      .sort({ createdAt: -1 })
      .limit(2)
      .lean();
    const prompt = getPhysicalHealthReportsPrompt(lastTwoWeekRecords);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    return res.json({ ai_suggestion: aiText });
  } catch (err) {
    console.error("AI Chat Response Error:", err);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await Student.findById(req.studentId)
      .select("-password")
      .populate({
        path: "mentor school",
        select: "-password",
      });

    return res.json(user);
  } catch (error) {
    next(error);
  }
};
