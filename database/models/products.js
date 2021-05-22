module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define(
      "tbl_products",
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          //   if (db[modelName].associate) {
          //     db[modelName].associate(db);
          //   }
          // });
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        category_id: {
          type: Sequelize.INTEGER,
          // primaryKey: true,
          references: {
            model: "tbl_categorys",
            key: "id",
          },
          allowNull: false,
        },
        brand_id: {
          type: Sequelize.INTEGER,
          // primaryKey: true,
          references: {
            model: "tbl_brands",
            key: "id",
          },
          allowNull: true,
        },
        rating: {
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
      {createdAt: false, updatedAt: false }
    );
    Product.associate = function (models) {
      // associations can be defined here
    //   Product.belongsTo(models.User, { foreignKey: "userId", as: "author" });
    //   Product.hasMany(models.Comment, { foreignKey: "postId", as: "comments" });
    };
    return Product;
  };
  