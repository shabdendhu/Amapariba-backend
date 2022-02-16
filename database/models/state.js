module.exports = (sequelize, Sequelize) => {
  const State = sequelize.define(
    "tbl_state",
    {
      country_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_country",
          key: "id",
        },
        allowNull: false,
      },
      state_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      state_code: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: "1",
      },
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
    }
  );
  State.associate = function (models) {
    State.belongsTo(models.tbl_country, {
      as: "country",
      foreignKey: "country_id",
    });
  };
  return State;
};
