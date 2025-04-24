import Teacher from "../models/teacher.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import Student from "../models/student.model.js";
import mongoose from "mongoose";
export function root(req, res) {
  return res.json({
    message: "student route",
  });
}
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

    const isPasswordMatch = await bcrypt.compare(password,teacher.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

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