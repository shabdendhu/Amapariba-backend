module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "tbl_categorys",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: true,
      },
      is_popular: {
        type: Sequelize.STRING,
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
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.tbl_products, { foreignKey: "category_id", as: "product" });
  };
  return Category;
};
