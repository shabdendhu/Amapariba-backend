module.exports = (sequelize, Sequelize) => {
  const OrderDetails = sequelize.define(
    "tbl_order_details",
    {
      // order_id: {
      //     type: Sequelize.INTEGER,
      //     allowNull: false,
      //     references: {
      //       model: "tbl_order_items",
      //       key: "id",
      //     },
      //   },
      order_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      order_status: {
        type: Sequelize.STRING,

        allowNull: false,
      },
    },
    { updatedAt: false }
  );
  OrderDetails.associate = function (models) {};
  return OrderDetails;
};
