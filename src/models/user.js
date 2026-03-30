module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: { type: DataTypes.BIGINT, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    is_deleted: DataTypes.BOOLEAN
  }, {
    tableName: "users",
    timestamps: false
  });
};