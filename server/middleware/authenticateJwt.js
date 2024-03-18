import dotenv from "dotenv";
import jwt  from "jsonwebtoken";

dotenv.config();

const authenticateJwt = (req, res, next) => {
  try {
    let token = req.header("token").split(" ")[1];
    if (!token) {
      res.status(401).json("Access denied");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json("Invalid Token");
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json("Token Not Found");
  }
};

export default authenticateJwt;