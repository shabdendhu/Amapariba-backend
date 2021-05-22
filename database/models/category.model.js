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
    //   Product.belongsTo(models.User, { foreignKey: "userId", as: "author" });
    //   Product.hasMany(models.Comment, { foreignKey: "postId", as: "comments" });
  };
  return Category;
};
