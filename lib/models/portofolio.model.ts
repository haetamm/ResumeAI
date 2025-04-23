import mongoose from "mongoose";

const portofolioSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  preview: { type: String },
  sourceCode: { type: String },
  startDate: { type: String },
  endDate: { type: String },
});

const Portofolio =
  mongoose.models.Portofolio || mongoose.model("Portofolio", portofolioSchema);

export default Portofolio;
