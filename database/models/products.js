module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "tbl_products",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_categorys",
          key: "id",
        },
        allowNull: false,
      },
      brand_id: {
        type: Sequelize.INTEGER,
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
    { createdAt: false, updatedAt: false }
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.tbl_quantity_options, {
      foreignKey: "product_id",
      as: "qntity",
    });
    Product.belongsTo(models.tbl_categorys, {
      foreignKey: "category_id",
      as: "category",
    });
    Product.belongsTo(models.tbl_brands, {
      foreignKey: "brand_id",
      as: "brand",
    });
    // Product.belongsTo(models.tbl_topdeal, {
    //   foreignKey: "product_id",
    //   as: "brand",
    // });
    // Product.belongsToMany(models.tbl_users, {
    //   through: {
    //     model: models.tbl_baskets,
    //   },
    //   foreignKey: "product_id",
    // });
    
  };
  return Product;
};
