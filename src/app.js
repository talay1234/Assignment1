// src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const configRoutes = require("./routes/configs");
const statusRoutes = require("./routes/status");
const logRoutes = require("./routes/logs");

app.use("/configs", configRoutes);
app.use("/status", statusRoutes);
app.use("/logs", logRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
