import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import adminRoutes from "./routes/admin.auth.js";
import passport from "./config/passport.js";
import session from "express-session";
import productRoutes from "./routes/product.route.js";
import Product from "./models/product.model.js"; // Import your Product model

dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const __dirname = path.resolve();
const app = express();
app.use(express.json());
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

const JWT_SECRET = process.env.JWT_SECRET;

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/api/config", (req, res) => {
  res.json({ JWT_SECRET });
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

app.use(express.json());
app.use(cookieParser());

// Use Multer middleware to handle file uploads for the product route (PDFs)
app.use("/api/products", upload.single("pdf"), async (req, res, next) => {
  try {
    const { originalname } = req.file;

    // Save the PDF file details to MongoDB
    const product = new Product({
      pdf: {
        fileUrl: null, // You may set the URL here if you have it hosted elsewhere
        originalname: originalname,
        // Add other properties as needed
      },
    });

    // You may want to save the buffer to cloud storage (e.g., AWS S3) and set the fileUrl accordingly
    // For simplicity, we are not saving the file content to the server in this example

    await product.save();

    res.status(200).json({ message: 'PDF uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use("/api", adminRoutes);
app.use("/api", productRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Error:", err); // Log the error
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});
