const express = require("express");
const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./config/db");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());


// Slash route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Node Template API" });
});

// // Template routes
// app.use("/api/templates", templateRoutes);

// Sync models
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
