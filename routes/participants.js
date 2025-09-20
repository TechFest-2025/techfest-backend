import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();

// 📌 POST new participant
router.post("/", async (req, res) => {
  try {
    const newParticipant = new Participant(req.body);
    await newParticipant.save(); // ensure awaited
    console.log("✅ Participant saved:", req.body);
    res.status(201).json(newParticipant);
  } catch (err) {
    console.error("❌ Error saving participant:", err);
    res.status(500).json({ message: "Failed to save participant" });
  }
});

// 📌 GET all participants
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching participants" });
  }
});

// 📌 PATCH payment status (Approve / Reject)
router.patch("/:id/payment", async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    const participant = await Participant.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: status },
      { new: true }
    );

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    console.log(`✅ Payment status updated: ${participant.fullName} → ${status}`);
    res.json(participant);
  } catch (err) {
    console.error("❌ Error updating payment status:", err);
    res.status(500).json({ message: "Failed to update payment status" });
  }
});

export default router;
