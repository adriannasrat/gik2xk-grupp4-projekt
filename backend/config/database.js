require("dotenv").config({ path: __dirname + "/../.env" });

const { Sequelize } = require("sequelize");

console.log("Connecting with:", process.env.DB_USER, process.env.DB_PASSWORD);

const sequelize = new Sequelize(
  process.env.DB_NAME || "shop_db",
  process.env.DB_USER || "root",
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mariadb",
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MariaDB with Sequelize");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();

module.exports = sequelize;
