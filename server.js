// server.js
import dotenv from "dotenv";
dotenv.config(); // ✅ Load env before anything else

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ✅ Centralize environment variable checks
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env file!");
  process.exit(1);
}
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys are missing. Please check your .env file!");
  process.exit(1);
}

// Routes
import participantsRoutes from "./routes/participants.js";
import gameRoutes from "./routes/games.js";
import settingsRoutes from "./routes/settings.js";
import adminRoutes from "./routes/admin.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/participants", participantsRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Create an async function to start the app
const startServer = async () => {
  try {
    // Dynamically import the payment routes after dotenv has run
    const { default: paymentRoutes } = await import("./routes/payment.js");
    app.use("/api/payment", paymentRoutes);

    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Atlas connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
};

// Start the server
startServer();