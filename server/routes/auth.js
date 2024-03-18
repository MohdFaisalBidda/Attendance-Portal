import dotenv from "dotenv";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authenticateJwt from "../middleware/authenticateJwt.js";
import express from "express";

const router = express.Router();
dotenv.config();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("attendance");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Internal Server error");
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(406).json("User already exists!");
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = await new User({
    username,
    password: hashedPass,
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });

    if (!findUser) {
      res.status(404).json("User not Found");
      return;
    }

    const matchedPass = await bcrypt.compare(password, findUser.password);
    if (!matchedPass) {
      res.status(406).json("Invalid Credentials!");
      return;
    }

    const token = jwt.sign(
      { id: findUser._id, username: findUser.username },
      process.env.JWT_SECRET
    );
    res.status(200).json({ ...findUser._doc, token });
  } catch (error) {
    res.status(500).json("Invalid Credentials!");
  }
});

router.post("/reset", async (req, res) => {
  try {
    const { username, currPassword, newPassword } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json("User does not exists!");
      return;
    }

    const matchedPass = await bcrypt.compare(currPassword, user.password);

    if (!matchedPass) {
      res.status(406).json("Password is incorrect!");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(newPassword, salt);
    user.password = hashedPass;
    await user.save();

    res.status(200).json("Password Changed Succesfully!");
  } catch (error) {
    res.status(500).json("Error Changing password");
  }
});

export default router;
