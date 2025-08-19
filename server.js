import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import participantRoutes from "./routes/participants.js";
import gameRoutes from "./routes/games.js";
import settingsRoutes from "./routes/settings.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: "techfestDB" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Default route
app.get("/", (req, res) => res.send("🚀 Techfest Backend is running..."));

// Routes
app.use("/api/participants", participantRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/settings", settingsRoutes);

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true, message: "✅ Admin login successful" });
  } else {
    return res.status(401).json({ success: false, message: "❌ Invalid credentials" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
