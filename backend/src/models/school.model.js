import { model, Schema } from "mongoose";

const schoolSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
    district: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String },
    head_name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  { timestamps: true },
);

const School = model("School", schoolSchema);
export default School;
