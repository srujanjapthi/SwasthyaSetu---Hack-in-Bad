import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Student from "../models/student.model.js";
export function root(req, res) {
  return res.json({
    message: "student route",
  });
}
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

    const isPasswordMatch = await bcrypt.compare(password,student.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({studentId:student._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });


  res.cookie("student_auth_token", token,{
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure:process.env.NODE_ENV === "production",
    });


    return res.status(200).json({
      studentId: student._id,
      message: "Student Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};