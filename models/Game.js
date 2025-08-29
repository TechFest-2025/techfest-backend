import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["Technical", "Non-Technical"], required: true },
  type: { type: String, enum: ["Solo", "Team"], required: true },
  maxTeamSize: { type: Number, default: 1 },
  fee: { type: Number, required: true },
  description: { type: String },
});

export default mongoose.model("Game", gameSchema);
