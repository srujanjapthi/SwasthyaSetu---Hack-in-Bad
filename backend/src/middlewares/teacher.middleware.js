import jwt from "jsonwebtoken";

const verifyTeacherToken = (req, res, next) => {
  const token = req.cookies["teacher_auth_token"];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.teacherId = decoded.teacherId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default {
  verifyTeacherToken,
};