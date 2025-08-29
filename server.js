import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import participantsRoutes from "./routes/participants.js";
import gameRoutes from "./routes/games.js";
import settingsRoutes from "./routes/settings.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/participants", participantsRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);

// ✅ DB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
