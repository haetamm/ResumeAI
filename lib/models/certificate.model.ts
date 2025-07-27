import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: { type: String },
  issuedBy: { type: String },
  link: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
});

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);

export default Certificate;
