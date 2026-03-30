module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Watermark", {
    consumer_id: { type: DataTypes.STRING, unique: true },
    last_exported_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: "watermarks",
    timestamps: false
  });
};