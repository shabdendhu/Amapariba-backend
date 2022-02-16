require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "kishan",
    database: "database_2",
    host: "localhost",
    dialect: "mysql",
    port: "3306",
  },
  test: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    host: process.env.DBHOST,
    dialect: "mysql",
    port: process.env.DBPORT,
  },
  production: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    host: process.env.DBHOST,
    dialect: "mysql",
    port: process.env.DBPORT,
  },
};
