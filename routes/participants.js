import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();

// POST new participant
router.post("/", async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save();  // 🔑 ensure awaited
    console.log("✅ Participant saved:", req.body);
    res.status(201).json(newParticipant);
  } catch (err) {
    console.error("❌ Error saving participant:", err);
    res.status(500).json({ message: "Failed to save participant" });
  }
});

// GET all participants
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching participants" });
  }
});

export default router;
