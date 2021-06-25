require("dotenv").config();

module.exports = {
  development: {
    "username": "admin",
    "password": "hD9ghw9e",
    "database": "database_2",
    "host": "mysql-34618-0.cloudclusters.net",
    "dialect": "mysql",
    "port":"34618"

    // username: "kishan",
    // password: "manage",
    // database: "GraphQl_Nodejs_Sequlize",
    // host: "localhost",
    // dialect: "mysql",
  },
  "test": {
    "username": "admin",
    "password": "hD9ghw9e",
    "database": "database_2",
    "host": "mysql-34618-0.cloudclusters.net",
    "dialect": "mysql",
    "port":"34618"
  },
  "production": {
    "username": "admin",
    "password": "hD9ghw9e",
    "database": "database_2",
    "host": "mysql-34618-0.cloudclusters.net",
    "dialect": "mysql",
    "port":"34618"
  }
};
