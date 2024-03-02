// server/routes/admin.mjs
import express from "express";
import { ensureAdminAuthenticated } from "../controllers/admin.auth.js";

const router = express.Router();

// Protected admin dashboard route
router.get("/dashboard", ensureAdminAuthenticated, (req, res) => {
  res.json({ message: "Admin dashboard page" });
});

// Additional protected admin routes can be added here

export default router;
