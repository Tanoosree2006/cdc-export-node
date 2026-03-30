require("dotenv").config();

const express = require("express");
const { sequelize } = require("./models");

const app = express();
app.use(express.json());

app.use("/", require("./routes/exportRoutes"));

// ❗ ONLY connect DB if NOT testing
if (process.env.NODE_ENV !== "test") {
  sequelize.authenticate().then(() => {
    console.log("DB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  });
}

module.exports = app;