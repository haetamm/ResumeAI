import mongoose from "mongoose";
import { themeColors } from "../utils";

const resumeSchema = new mongoose.Schema({
  resumeId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  firstName: { type: String },
  lastName: { type: String },
  imageUrl: { type: String },
  birthplace: { type: String },
  birthdate: { type: String },
  jobTitle: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  summary: { type: String },
  experience: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  certificate: [{ type: mongoose.Schema.Types.ObjectId, ref: "Certificate" }],
  portofolio: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portofolio" }],
  socmed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Socmed" }],
  themeColor: { type: String, default: themeColors[0] },
});

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default Resume;
