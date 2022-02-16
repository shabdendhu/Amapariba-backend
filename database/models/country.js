module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define(
    "tbl_country",
    {
      country_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      iso_code: {
        type: Sequelize.STRING(30),
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
  Country.associate = function (models) {};
  return Country;
};
