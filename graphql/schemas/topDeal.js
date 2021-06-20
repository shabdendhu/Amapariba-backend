const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allTopDeals: [TopDeals]
  }
  type TopDeals {
    id: Int
    product_id: String
    Products: Products
  }
  extend type Mutation {
    add_new_TopDeals(input: AddTopDeals!): AddTopdealRes
  }
  input AddTopDeals {
    product_id: Int
    created_by: Int
  }
  type AddTopdealRes {
    status: Int
  }
`;
