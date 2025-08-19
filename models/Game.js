import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["Technical", "Non-Technical"], required: true },
  type: { type: String, enum: ["Solo", "Team"], default: "Solo" }, // Solo / Team
  fee: { type: Number, required: true },
  maxTeamSize: { type: Number, default: 1 },
  description: { type: String }
});

export default mongoose.model("Game", gameSchema);
