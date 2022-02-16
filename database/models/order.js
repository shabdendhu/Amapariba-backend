module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "tbl_order_items",
    {
      basket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbl_baskets",
            key: "id",
          },
      },
      order_no_id:{
        type:Sequelize.STRING,
        allowNull:true,
        references:{
          model:"tbl_order_details",
          key:"order_no"
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
    },
    { updatedAt: false }
  );
  Order.associate = function (models) {
    Order.belongsTo(models.tbl_order_details, {
      foreignKey: "order_no_id",
      as: "OrderDetails",
    });
    Order.belongsTo(models.tbl_users, {
      foreignKey: "user_id",
      as: "Users",
    });
    Order.belongsTo(models.tbl_baskets, {
        foreignKey: "basket_id",
        as: "Basket",
      });
  };
  return Order;
};
