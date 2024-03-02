// adminNotifications.route.js

import express from "express";
import { getAdminNotifications } from "../controllers/notificationController.js";

const router = express.Router();

// Define a route to get admin notifications
router.get("/admin/notifications", getAdminNotifications);

export default router;
