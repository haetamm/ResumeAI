import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String },
  companyName: { type: String },
  city: { type: String },
  state: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  workSummary: { type: String },
});

const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default Experience;
