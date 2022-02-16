module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define(
    "tbl_city",
    {
      city_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        // unique: true
      },
      country_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_country",
          key: "id",
        },
        allowNull: false,
      },
      state_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_state",
          key: "id",
        },
        allowNull: false,
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
  City.associate = function (models) {
    City.belongsTo(models.tbl_country, {
      as: "country",
      foreignKey: "country_id",
    });
    City.belongsTo(models.tbl_state, { as: "state", foreignKey: "state_id" });
  };

  return City;
};
