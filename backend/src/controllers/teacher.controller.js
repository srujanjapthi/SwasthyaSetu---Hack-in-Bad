import Teacher from "../models/teacher.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import Student from "../models/student.model.js";
import mongoose from "mongoose";
import { parse } from "csv-parse";
import WeeklyHealthRecord from "../models/weekly-health-records.model.js";
import fs from "fs"

export const signInTeacher = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //console.log(email,password)
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

   // const isPasswordMatch = await bcrypt.compare(password,teacher.password);

    // if (!isPasswordMatch) {
    //   return res.status(400).json({
    //     message: "Invalid credentials",
    //   });
    // }

    const token = jwt.sign({teacherId:teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });


  res.cookie("teacher_auth_token", token,{
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure:process.env.NODE_ENV === "production",
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

  let {name,email,password,dob,gender,classname,section,school,mentor}=req.body;

  if(!name || !email || !password || !dob || !classname || !gender || !section || !school || !mentor){
    return res.status(400).json({
      message: "All fields are required",
    });
  }


  
    
   student = await Student.create(
      {
        ...req.body,
        password: await bcrypt.hash(password, 10),
        school:new mongoose.Types.ObjectId(school),
        class:classname,
        mentor:new mongoose.Types.ObjectId(mentor)
      }
    );

    res.status(201).json({
    studentId:student._id,
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

    parse(file.buffer, {
      columns: true,
      skip_empty_lines: true
    }, (err, records) => {
      if (err) return next(err);

      const parsedRecords = records.map(row => ({
        ...row,
        body_temp: parseFloat(row.body_temp),
        shuttle_run: parseInt(row.shuttle_run),
        plank_time: parseInt(row.plank_time),
        squats: parseInt(row.squats),
        weight: parseFloat(row.weight),
        height: parseFloat(row.height),
        bmi: parseFloat(row.bmi),
      }));

      // Save parsed records to the database
      parsedRecords.forEach(async (record) => {
        const { email, body_temp, shuttle_run, plank_time, squats, weight, height, bmi } = record;
        await WeeklyHealthRecord.create({
          email,
          body_temp,
          shuttle_run,
          plank_time,
          squats,
          weight,
          height,
          bmi
        });
      });

      return res.status(200).json({
        message: "Student health records uploaded successfully",
      
      });
    });
  } catch (error) {
    next(error);
  }
}

export const getAllStudents = async (req, res, next) => {
  const teacherId = req.teacherId;
  console.log(teacherId);
  
  try {
    const students = await Student.find({ mentor: teacherId }).populate("mentor").populate("school").select("-password -__v");

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
}