import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: String, default: Date.now() },
  status: { type: String, enum: ["present", "absent"], required: true },
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
