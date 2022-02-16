const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
  const Basket = sequelize.define(
    "tbl_baskets",
    {
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_products",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      quantity_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_quantity_options",
          key: "id",
        },
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: "1",
      },
      createdAt:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function () {
          if (!this.getDataValue("createdAt")) {
            return this.getDataValue("createdAt");
          } else {
            return moment
              .utc(this.getDataValue("createdAt"))
              .format("DD MMMM YYYY");
          }
        },
      }
    },
    {updatedAt: false }
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
    Basket.belongsTo(models.tbl_quantity_options, {
      foreignKey: "quantity_id",
      as: "quantityOption",
    });
  };

  return Basket;
};
