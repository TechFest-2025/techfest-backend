import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

// ➝ GET all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

// ➝ POST add new game
router.post("/", async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: "Failed to add game" });
  }
});

// ➝ PUT update game
router.put("/:id", async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update game" });
  }
});

// ➝ DELETE game
router.delete("/:id", async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});

export default router;
