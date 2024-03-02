import { errorHandler } from "../utils/error.js";

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // User is an admin
    next();
  } else {
    // User is not authorized as an admin
    return next(errorHandler(403, "You are not authorized as an admin"));
  }
};
