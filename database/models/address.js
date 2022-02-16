module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define(
    "tbl_Address",
    {
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
      city_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_city",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      location: { type: Sequelize.STRING, allowNull: false },
      landmark: { type: Sequelize.STRING, allowNull: true },
      pin: { type: Sequelize.STRING, allowNull: true },
      address_type: { type: Sequelize.STRING, allowNull: true },
      address_mobile: { type: Sequelize.INTEGER, allowNull: true },
      latitude: { type: Sequelize.STRING, allowNull: true },
      longitude: { type: Sequelize.STRING, allowNull: true },
    },
    {
      updatedAt: false,
      freezeTableName: true, // Model tableName will be the same as the model name
    }
  );
  Address.associate = function (models) {
    Address.belongsTo(models.tbl_country, {
      as: "Country",
      foreignKey: "country_id",
    });
    Address.belongsTo(models.tbl_state, {
      as: "State",
      foreignKey: "state_id",
    });
    Address.belongsTo(models.tbl_city, { as: "City", foreignKey: "city_id" });
    Address.belongsTo(models.tbl_users, { as: "Users", foreignKey: "user_id" });
  };
  return Address;
};
