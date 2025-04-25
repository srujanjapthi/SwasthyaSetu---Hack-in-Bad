import jwt from "jsonwebtoken";

export const verifyStudentToken = (req, res, next) => {
  const token = req.cookies["student_auth_token"];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.studentId = decoded.studentId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
