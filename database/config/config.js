require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    host: process.env.DBHOST,
    dialect: "mysql",
    port: process.env.DBPORT,
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
