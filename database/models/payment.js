module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define(
    "tbl_payments",
    {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tbl_order_details",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { updatedAt: false }
  );
  Payment.associate = function (models) {
    Payment.belongsTo(models.tbl_order_details, {
      foreignKey: "order_id",
      as: "Orders",
    });
   
  };
  return Payment;
};
