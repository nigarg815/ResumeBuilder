require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const authRoutes = require("./routes/auth");
const ProductRouter = require("./routes/ProductRouter");

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Environment variables
const PORT = process.env.PORT || 3000;
const DBURI = process.env.DBURI;

// MongoDB Connection
mongoose
  .connect(DBURI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
app.use(authRoutes);
app.use("/products", ProductRouter);

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// General Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
