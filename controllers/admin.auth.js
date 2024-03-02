// server/middleware/auth.mjs
export const ensureAdminAuthenticated = (req, res, next) => {
  // Check if the user is authenticated and is an admin
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next(); // User is authenticated as an admin, proceed to the route
  }
  res.status(401).json({ message: "Unauthorized" }); // Not authenticated as admin
};
