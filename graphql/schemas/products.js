const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allProduct: [Products]
    get_product_by_id(id: Int!): Products
  }
  type Products {
    id: Int
    name: String
    category_id: Int
    brand_id: Int
    image: String
    rating: Int
    created_by: Int
    updated_by: Int
    is_active: Boolean
  }
  extend type Mutation {
    create_new_product(input: AddProductInput!): AddProductResponse
    update_product(input: UpdateProductInput!): UpdateProductResponse
    delete_product(id: Int!): DeleteProductResponse
  }
  type UpdateProductResponse {
    status: Int
  }
  type DeleteProductResponse {
    status: Int
  }
  input AddProductInput {
    name: String
    category_id: Int
    brand_id: Int
    image: String
    rating: Int
    created_by: Int
  }
  type AddProductResponse {
    name: String
    category_id: Int
    brand_id: Int
  }
  input UpdateProductInput {
    id: Int
    name: String
    category_id: Int
    brand_id: Int
    image: String
    rating: Int
    updated_by: Int
    is_active: Boolean
  }
`;
