import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();

// ➝ Save participant
router.post("/", async (req, res) => {
  try {
    const participant = new Participant(req.body);
    await participant.save();
    res.status(201).json(participant);
  } catch (err) {
    console.error("❌ Error saving participant:", err);
    res.status(500).json({ error: "Failed to save participant" });
  }
});

// ➝ Get all participants
router.get("/all", async (req, res) => {
  try {
    const participants = await Participant.find().sort({ createdAt: -1 });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch participants" });
  }
});

export default router;
