import express from "express";
import passport from "passport";

const router = express.Router();

const defaultAdminUsername = "admin";
const defaultAdminPassword = "your_default_password";

router.post("/admin/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Admin authentication failed" });
    }
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res
        .status(200)
        .json({ message: "Admin authenticated successfully" });
    });
  })(req, res, next);
});

export default router;
