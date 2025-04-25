import { model, Schema } from "mongoose";

const weeklyHealthRecordSchema = new Schema(
  {
    email: { type: String, required: true },
    body_temp: { type: Number, default: 0 },
    shuttle_run: { type: Number, default: 0 },
    plank_time: { type: Number, default: 0 },
    squats: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bmi: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const WeeklyHealthRecord = model(
  "WeeklyHealthRecord",
  weeklyHealthRecordSchema,
);
export default WeeklyHealthRecord;
