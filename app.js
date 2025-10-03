const express = require("express");
const sequelize = require("./utilities/db");
const templateRoutes = require("./routes/templateRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(logger); // custom middleware

// test route
app.get("/", (req, res) => {
  
  res.send("Welcome to Template API 🚀");
});

app.use("/api/templates", templateRoutes);

// DB connection
sequelize.sync()
  .then(() => { console.log("Table is Created");})
.catch(err => console.error("error:", err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));