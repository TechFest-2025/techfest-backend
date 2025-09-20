import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    collegeName: String,
    department: String, // 🆕 Added Department field
    city: String,
    eventName: String,
    category: String,
    teamName: String,
    teamMembers: [String],
    fee: Number,

    // 🔑 Manual payment fields
    transactionId: String,
    screenshotUrl: String, // store file path or cloud URL
    paymentStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Participant", participantSchema);
