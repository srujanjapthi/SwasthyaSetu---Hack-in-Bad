import { model, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, minLength: 10, maxLength: 10 },
  },
  { timestamps: true },
);

const Admin = model("Admin", adminSchema);
export default Admin;
