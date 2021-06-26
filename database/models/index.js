"use strict";
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = (process.env.NODE_ENV);
const config = require(__dirname + "/../config/config.js")[env];
const db = {};
console.log(config)
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    // config.port,
    config
  );
}
// This will help to remove the nusty imports of models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // console.log(file);
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });
// Associations of tables
Object.keys(db).forEach((modelName) => {
  console.log(modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.sequelize.sync({ force: false }); //Change force:true if data base is needed and run once then revert it
// readFile

// let Textdata = [];
// fs.readdirSync(`${__dirname.substring(0, __dirname.lastIndexOf("/"))}/controllers`).forEach((file) => {
//  let filepath = `${__dirname.substring(0, __dirname.lastIndexOf("/"))}/controllers/${file}`
//   fs.readFile(filepath, function (err, data) {
//     if (err) throw err;
//     if (data.includes("Sequelize")) {
//       Textdata.push(`${file.substring(0, file.indexOf("."))}:done`);
//     } else {
//       Textdata.push(`${file.substring(0, file.indexOf("."))}:`);
//     }
//   });
// })

module.exports = db;
