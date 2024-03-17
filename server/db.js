import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const db = mongoose.connect(process.env.MONGO_URI);

db ? console.log("Connected to DB") : console.log("Error Connecting to DB");

export default db;