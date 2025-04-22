import { model, Schema } from "mongoose";

const teacherSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String, enum: ["male", "female", "other"] },
  school: { type: Schema.Types.ObjectId, ref: "School" },
});

const Teacher = model("Teacher", teacherSchema);
export default Teacher;
