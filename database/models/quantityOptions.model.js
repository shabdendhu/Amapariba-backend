module.exports = (sequelize, Sequelize) => {
  const QuantityOptions = sequelize.define(
    "tbl_quantity_options",
    {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_products",
          key: "id",
        },
        allowNull: false,
      },
      base_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_units",
          key: "id",
        },
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
  QuantityOptions.associate = function (models) {
    // associations can be defined here
    QuantityOptions.belongsTo(models.tbl_products, {
      foreignKey: "product_id",
      as: "product",
    });
    QuantityOptions.belongsTo(models.tbl_units, {
      foreignKey: "unit_id",
      as: "unit",
    });
  };

  return QuantityOptions;
};
