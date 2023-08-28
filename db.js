import Sequelize from "sequelize";

// Option 1: Passing a connection URI
const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
