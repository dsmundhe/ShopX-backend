// Load environment variables first
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create instance of express
const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Import routers
const router = require("./routes/userRouter");

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MongoDB_URL;

// Test route
app.get('/', (req, res) => {
  res.send("<h1>Backend connected successfully!</h1>");
});

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Optional: Add timeout
})
.then(() => {
  console.log("MongoDB connected.....");

  // Start server only after DB is connected
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

})
.catch((error) => {
  console.error("MongoDB connection error:", error.message);
});

// Routes middleware
app.use("/user", router);
