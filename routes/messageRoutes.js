import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// POST /api/messages -> save a new message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!okEmail) {
      return res.status(400).json({ success: false, error: "Invalid email." });
    }

    const doc = await Message.create({ name, email, message });
    res.status(201).json({ success: true, id: doc._id, message: "Message stored." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: "Server error." });
  }
});

// GET /api/messages -> list all messages (optional, for admin)
router.get("/", async (_req, res) => {
  try {
    const items = await Message.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ success: false, error: "Server error." });
  }
});

export default router;
 
