import { model, Schema } from "mongoose";
const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    class: { type: String },
    section: { type: String },
    school: { type: Schema.Types.ObjectId, ref: "School" },
    mentor: { type: Schema.Types.ObjectId, ref: "Teacher" },
  },
  { timestamps: true },
);

const Student = model("Student", studentSchema);
export default Student;
