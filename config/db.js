const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

sequelize.authenticate()
.then(()=>console.log("Database Connected Succesfully..!"))
.catch(err => console.error("Error : ",err.message))

module.exports = sequelize;
