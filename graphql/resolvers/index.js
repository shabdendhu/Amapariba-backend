// const userResolvers = require('./user');
// const postResolvers = require('./post');
const productResolvers = require("./products");
const categoryResolvers = require("./category");
const brandResolvers = require("./brand");
const userResolvers = require("./user");
const quantityOptionsResolvers = require("./quantityOptions");
const unitResolvers = require("./unit");
const basketResolvers = require("./basket");

module.exports = [
  productResolvers,
  categoryResolvers,
  brandResolvers,
  userResolvers,
  quantityOptionsResolvers,
  unitResolvers,
  basketResolvers,
];
