module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define(
    "tbl_brands",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ratings: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: "0",
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
  Brand.associate = function (models) {
    // associations can be defined here
    //   Product.belongsTo(models.User, { foreignKey: "userId", as: "author" });
    //   Product.hasMany(models.Comment, { foreignKey: "postId", as: "comments" });
  };
  return Brand;
};
