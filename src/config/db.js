const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "test") {
  // ✅ Use in-memory SQLite for tests
  sequelize = new Sequelize("sqlite::memory:", {
    logging: false
  });
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false
  });
}

module.exports = sequelize;