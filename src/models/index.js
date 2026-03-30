const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const User = require("./user")(sequelize, Sequelize.DataTypes);
const Watermark = require("./watermark")(sequelize, Sequelize.DataTypes);

module.exports = { sequelize, User, Watermark };