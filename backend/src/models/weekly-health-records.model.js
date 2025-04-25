import { model, Schema } from "mongoose";

const weeklyHealthRecordSchema = new Schema(
  {
    email: { type: String, required: true },
    body_temp: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bmi: { type: Number, default: 0 },
    blood_pressure: { type: Number, default: 0 },
    pulse: { type: Number, default: 0 },
    waist_circumference: { type: Number, default: 0 },
    week: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const WeeklyHealthRecord = model(
  "WeeklyHealthRecord",
  weeklyHealthRecordSchema,
);
export default WeeklyHealthRecord;
