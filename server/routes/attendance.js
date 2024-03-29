import dotenv from "dotenv";
import express from "express";
import Attendance from "../models/AttendanceModel.js";
import User from "../models/UserModel.js";
import authenticateJwt from "../middleware/authenticateJwt.js";
const router = express.Router();

dotenv.config();

router.get("/:id", authenticateJwt,async (req, res) => {
  try {
    const userId = req.params.id;
    const attendanceRecords = await Attendance.find({ userId });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authenticateJwt,async (req, res) => {
  try {
    const { userId, date, status } = req.body;

    const formatDate = new Date(date).toISOString();
    console.log(formatDate);
    const existingAttendance = await Attendance.findOne({
      userId,
      date: formatDate,
    });
    if (existingAttendance) {
      return res
        .status(409)
        .json({ error: "Attendance already marked for the day!" });
    }

    const newAttendance = new Attendance({ userId, date: formatDate, status });
    await newAttendance.save();

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json("User not Found");
    }

   user.attendance.push(newAttendance._id);
    await user.save();
    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", authenticateJwt,async (req, res) => {
  try {
    const userId = req.params.id;
    const { attendanceId, status } = req.body;

    if (status !== "present" && status !== "absent") {
      return res.status(404).json({ message: "Invalid status" });
    }
    const existingAttendance = await Attendance.findOneAndUpdate(
      {
        userId: userId,
        _id: attendanceId,
      },
      { $set: { status: status } },
      { new: true }
    );
    if (!existingAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json(existingAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id",authenticateJwt, async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const deletedAttendance = await Attendance.deleteOne({ _id: attendanceId });
    if (deletedAttendance.deletedCount === 1) {
      res
        .status(200)
        .json({ message: "Attendance record removed successfully!" });
    } else {
      res.status(500).json({ message: "Attendance record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
