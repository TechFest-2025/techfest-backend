import express from "express";
import Setting from "../models/Setting.js";

const router = express.Router();

// ➝ GET registration setting
router.get("/", async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ registrationOpen: true });
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// ➝ PUT update registration setting
router.put("/", async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({ registrationOpen: req.body.registrationOpen });
    } else {
      setting.registrationOpen = req.body.registrationOpen;
      await setting.save();
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: "Failed to update settings" });
  }
});

export default router;
