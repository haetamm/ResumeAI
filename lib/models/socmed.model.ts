import mongoose from "mongoose";

const socmedSchema = new mongoose.Schema({
  name: { type: String },
  link: { type: String },
});

const Socmed = mongoose.models.Socmed || mongoose.model("Socmed", socmedSchema);

export default Socmed;
