import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import School from "../models/school.model.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import mongoose from "mongoose";

export const getUser = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    return res.json(admin);
  } catch (error) {
    next(error);
  }
};

export const signUpAdmin = async (req, res, next) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    let { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    admin = await Admin.create(req.body);
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("admin_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      adminId: admin._id,
      message: "Admin Registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signInAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        message: "Admin doesn't exist. Please Sign-up",
      });
    }

    if (password !== admin.password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("admin_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      adminId: admin._id,
      message: "Admin Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createSchoolProfile = async (req, res, next) => {
  try {
    let school = await School.findOne({ email: req.body.email });
    if (school) {
      return res.status(400).json({
        message: "School already exists",
      });
    }

    let { name, district, state, address, email, phone, head_name } = req.body;
    if (
      !name ||
      !district ||
      !state ||
      !address ||
      !email ||
      !phone ||
      !head_name
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    school = await School.create(req.body);

    res.status(201).json({
      school: school._id,
      message: "School created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createTeacherProfile = async (req, res, next) => {
  try {
    let teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher) {
      return res.status(400).json({
        message: "Teacher already exists",
      });
    }

    let { name, email, phone, password, school, gender } = req.body;
    if (!name || !email || !password || !phone || !school || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    teacher = await Teacher.create({
      ...req.body,
      password,
      school: new mongoose.Types.ObjectId(String(school)),
    });

    res.status(201).json({
      teacherId: teacher._id,
      message: "Teacher created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getSchools = async (req, res, next) => {
  try {
    const totalSchools = await School.countDocuments();
    res.status(200).json({
      totalSchools,
    });
  } catch (error) {
    next(error);
  }
};

export const getTeachers = async (req, res, next) => {
  try {
    const totalTeachers = await Teacher.countDocuments();
    res.status(200).json({
      totalTeachers,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    res.status(200).json({
      totalStudents,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSchoolsgroupbyDistrict = async (req, res, next) => {
  try {
    const schools = await School.aggregate([
      {
        $group: {
          _id: "$district",
          schools: { $push: "$$ROOT" },
        },
      },
    ]);
    res.status(200).json({
      schools,
    });
  } catch (error) {
    next(error);
  }
};
