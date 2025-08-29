import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  registrationOpen: { type: Boolean, default: true },
});

export default mongoose.model("Setting", settingSchema);
