import dotenv from "dotenv";
import express from "express";
import User from "../models/UserModel.js";
import authenticateJwt from "../middleware/authenticateJwt.js";
const router = express.Router();

dotenv.config();

router.get("/users",authenticateJwt, async (req, res) => {
  try {
    const users = await User.find().populate("attendance");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", authenticateJwt,async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await User.find({ _id: userId }).populate("attendance");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
