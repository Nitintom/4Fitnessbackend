// passport.js
import passport from "passport";
import LocalStrategy from "passport-local";

// Define the default admin username and password
const defaultAdminUsername = "admin";
const defaultAdminPassword = "your_default_password"; // Replace with your desired default password

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Check if the provided credentials match the default admin credentials
      if (
        username === defaultAdminUsername &&
        password === defaultAdminPassword
      ) {
        // Authentication successful
        return done(null, { username: defaultAdminUsername });
      } else {
        // Authentication failed
        return done(null, false, { message: "Incorrect username or password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  // Serialize the user or default admin username
  const serializedUser = user.username || defaultAdminUsername;
  done(null, serializedUser);
});

passport.deserializeUser(async (serializedUser, done) => {
  // Deserialize the user by finding it based on the username
  if (serializedUser === defaultAdminUsername) {
    return done(null, { username: defaultAdminUsername });
  }
  // You can add code here to find the user in your database
  // Deserialize the user based on your database logic
  // For example, you can use Mongoose to find the user by username
  // Example:
  // User.findOne({ username: serializedUser }, (err, user) => {
  //   if (err) {
  //     return done(err);
  //   }
  //   return done(null, user);
  // });
});

export default passport;
