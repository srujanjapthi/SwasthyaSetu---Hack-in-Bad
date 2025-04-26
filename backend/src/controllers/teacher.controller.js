import Teacher from "../models/teacher.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import mongoose from "mongoose";
import { parse } from "csv-parse";
import WeeklyHealthRecord from "../models/weekly-health-records.model.js";
import { getStudentHealthStatusPrompt } from "../constants/prompts.js";
import { ai } from "../config/ai.js";

export const signInTeacher = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({
        message: "Teacher doesn't exist. Please Sign-up",
      });
    }

    if (password !== teacher.password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ teacherId: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("teacher_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      teacherId: teacher._id,
      message: "Teacher Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createStudentProfile = async (req, res, next) => {
  try {
    let student = await Student.findOne({ email: req.body.email });

    if (student) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    let {
      name,
      email,
      password,
      dob,
      gender,
      classname,
      section,
      school,
      mentor,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !dob ||
      !classname ||
      !gender ||
      !section ||
      !school ||
      !mentor
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    student = await Student.create({
      ...req.body,
      password: await bcrypt.hash(password, 10),
      school: new mongoose.Types.ObjectId(school),
      class: classname,
      mentor: new mongoose.Types.ObjectId(mentor),
    });

    res.status(201).json({
      studentId: student._id,
      message: "Student created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const parseCsvFile = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    parse(
      file.buffer,
      { columns: true, skip_empty_lines: true },
      async (err, records) => {
        if (err) return next(err);

        const parsedRecords = records.map((row) => ({
          email: row.email,
          body_temp: parseFloat(row.body_temp) || 0,
          weight: parseFloat(row.weight) || 0,
          height: parseFloat(row.height) || 0,
          bmi: parseFloat(row.bmi) || 0,
          blood_pressure: parseFloat(row.blood_pressure) || 0,
          pulse: parseFloat(row.pulse) || 0,
          waist_circumference: parseFloat(row.waist_circumference) || 0,
          week: parseInt(row.week) || 0,
        }));

        // Save all records at once
        await WeeklyHealthRecord.insertMany(parsedRecords);

        return res.status(200).json({
          message: "Student health records uploaded successfully",
        });
      },
    );
  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find({ mentor: req.teacherId }).populate({
      path: "school mentor",
      select: "-password -__v",
    });

    if (!students) {
      return res.status(404).json({
        message: "No students found",
      });
    }

    return res.status(200).json({
      students,
      message: "Students fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.teacherId)
      .select("-password")
      .populate({
        path: "school",
        select: "-password",
      });

    return res.json(teacher);
  } catch (error) {
    next(error);
  }
};

export const getStudentWeeklyHealthRecords = async (req, res, next) => {
  try {
    const records = await WeeklyHealthRecord.find({ email: req.body.email });
    if (!records) {
      return res.status(404).json({
        message: "No records found",
      });
    }

    return res.status(200).json({
      records,
      message: "Records fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentHealthDetails = async (req, res) => {
  try {
    const students = await Student.find({}).populate("school mentor").lean();
    const healthRecords = await WeeklyHealthRecord.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$email",
          latestRecord: { $first: "$$ROOT" },
          allRecords: { $push: "$$ROOT" },
        },
      },
    ]);
    const studentDetails = students.map((student) => {
      const healthRecord = healthRecords.find((hr) => hr._id === student.email);
      const latestHealth = healthRecord?.latestRecord || {};
      const allHealthRecords = healthRecord?.allRecords || [];

      let fitnessLevel = "Average";
      let status = "Normal";

      if (latestHealth.bmi) {
        if (latestHealth.bmi < 18.5) {
          fitnessLevel = "Underweight";
          status = "At Risk";
        } else if (latestHealth.bmi >= 18.5 && latestHealth.bmi < 25) {
          fitnessLevel = "Fit";
          status = "Healthy";
        } else if (latestHealth.bmi >= 25 && latestHealth.bmi < 30) {
          fitnessLevel = "Overweight";
          status = "Needs Attention";
        } else {
          fitnessLevel = "Obese";
          status = "At Risk";
        }
      }

      let trend = "Stable";
      if (allHealthRecords.length >= 2) {
        const firstRecord = allHealthRecords[allHealthRecords.length - 1];
        const lastRecord = allHealthRecords[0];

        if (lastRecord.bmi > firstRecord.bmi + 2) trend = "Increasing";
        else if (lastRecord.bmi < firstRecord.bmi - 2) trend = "Decreasing";
      }

      return {
        id: student._id.toString(),
        name: student.name,
        email: student.email,
        grade: student.class || "N/A",
        section: student.section || "N/A",
        bmi: latestHealth.bmi?.toFixed(1) || "N/A",
        weight: latestHealth.weight || "N/A",
        height: latestHealth.height || "N/A",
        fitnessLevel,
        status,
        trend,
        school: student.school?.name || "N/A",
        mentor: student.mentor?.name || "N/A",
        lastUpdated: latestHealth.createdAt || new Date(),
      };
    });

    res.status(200).json(studentDetails);
  } catch (error) {
    console.error("Error fetching student health details:", error);
    res.status(500).json({ error: "Failed to fetch student health details" });
  }
};

export const getAllHealthStatus = async (req, res, next) => {
  try {
    const students = await Student.find({ mentor: req.teacherId });
    const studentEmails = students.map((student) => student.email);
    const studentsHealthRecords = await WeeklyHealthRecord.aggregate([
      { $match: { email: { $in: studentEmails } } },
      { $group: { _id: "$email", records: { $push: "$$ROOT" } } },
    ]);
    const prompt = getStudentHealthStatusPrompt(studentsHealthRecords);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    return res.json({ health_status: aiText });
  } catch (error) {
    next(error);
  }
};
