import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";
import Auth from "./routes/auth.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", Auth);

app.get("/", (req, res) => {
  res.json("Hello");
});

app.listen(PORT, (req, res) => {
  console.log(`Server running at ${PORT}`);
});
