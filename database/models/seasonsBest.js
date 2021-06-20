module.exports = (sequelize, Sequelize) => {
  const SeasonsBest = sequelize.define(
    "tbl_seasons_best",
    {
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_products",
          key: "id",
        },
        allowNull: false,
      },
      is_popular: {
        type: Sequelize.BOOLEAN,
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
  SeasonsBest.associate = function (models) {
    SeasonsBest.belongsTo(models.tbl_products, {
      foreignKey: "product_id",
      as: "Products",
    });
  };
  return SeasonsBest;
};
