const { gql } = require("apollo-server-express");
const product = require("./products");
const category = require("./category");
const brand = require("./brand");
const user = require("./user");
const quantityOptions = require("./quantityOptions");
const unit = require("./unit");
const basket = require("./basket");

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [
  rootType,
  product,
  category,
  brand,
  user,
  quantityOptions,
  unit,
  basket,
];
