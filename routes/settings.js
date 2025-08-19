import express from "express";
import Setting from "../models/Setting.js";

const router = express.Router();

// Get current setting
router.get("/", async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ registrationOpen: true });
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update registration status
router.put("/", async (req, res) => {
  try {
    const { registrationOpen } = req.body;
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ registrationOpen });
    } else {
      setting.registrationOpen = registrationOpen;
      await setting.save();
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
