import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: { type: String },
  issuedBy: { type: String },
  link: { type: String },
  startDate: { type: String },
  endDate: { type: String },
});

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);

export default Certificate;
