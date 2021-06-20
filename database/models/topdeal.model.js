module.exports = (sequelize, Sequelize) => {
    const Topdeal = sequelize.define(
      "tbl_topdeal",
      {
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "tbl_products",
            key: "id",
          },
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
    Topdeal.associate = function (models) {
      Topdeal.belongsTo(models.tbl_products,{foreignKey: "product_id",as:"Products"})
    };
    return Topdeal;
  };
  