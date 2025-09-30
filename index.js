const express = require("express");
const dotenv = require("dotenv");
const sequelize  = require("./config/db");
const Document = require("./models/template_model")


dotenv.config();

const app = express();
app.use(express.json());


// Slash route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Node Template API" });
});

// // Template routes
// app.use("/api/templates", templateRoutes);

// Sync models
sequelize.sync({alter:true})
.then(() =>console.log("Table is Created"))
.catch(err => console.error("error : ",err))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
