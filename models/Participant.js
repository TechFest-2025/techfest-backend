import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  collegeName: { type: String, default: "-" },
  city: { type: String, default: "-" },
  eventName: { type: String, required: true },
  category: { type: String, default: "unknown" },
  teamName: { type: String, default: "" },
  teamMembers: { type: [String], default: [] },
  fee: { type: Number, required: true },
  paymentId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Participant", participantSchema);
