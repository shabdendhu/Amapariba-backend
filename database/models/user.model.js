module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "tbl_users",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobile_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: "1",
      },
    },
    { createdAt: false, updatedAt: false }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.tbl_products, {
      through: { model: models.tbl_baskets },
      foreignKey: "user_id",
      as: "basket",
    });
    // User.hasMany(models.tbl_products, { foreignKey: "user_id", as: "basket" });
    // User.hasMany(models.tbl_products, { foreignKey: "category_id", as: "product" });
  };
  return User;
};
