module.exports = (sequelize, Sequelize) => {
  const Basket = sequelize.define(
    "tbl_baskets",
    {
      product_id: {
        type: Sequelize.INTEGER,
        // primaryKey: true,
        references: {
          model: "tbl_products",
          key: "id",
        },
        // allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        // primaryKey: true,
        references: {
          model: "tbl_users",
          key: "id",
        },
        // allowNull: false,
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
  Basket.associate = function (models) {
    // associations can be defined here
    Basket.belongsTo(models.tbl_products, {
      foreignKey: "product_id",
      as: "product",
    });
    Basket.belongsTo(models.tbl_users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Basket;
};
