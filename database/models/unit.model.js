module.exports = (sequelize, Sequelize) => {
  const Units = sequelize.define(
    "tbl_units",
    {
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short_name: {
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
  return Units;
};
