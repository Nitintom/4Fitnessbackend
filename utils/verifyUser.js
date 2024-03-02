import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return next(errorHandler(401, "No token found"));
  }

  const tokenData = token.split("Bearer ")[1];

  jwt.verify(tokenData, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Invalid token"));
    }

    req.user = user;
    next();
  });
};
