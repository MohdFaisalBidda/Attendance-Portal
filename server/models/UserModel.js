import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendance" }],
});

const User = mongoose.model("User", UserSchema);

export default User;
