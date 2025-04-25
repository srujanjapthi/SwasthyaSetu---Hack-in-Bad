import { model, Schema } from "mongoose";

const medicalRecordSchema = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    record_url: { type: String, required: true },
  },
  { timestamps: true },
);

const MedicalRecord = model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
