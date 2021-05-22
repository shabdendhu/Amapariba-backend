const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allBrand: [Brand]
    get_brand_by_id(id: Int!): Brand
  }
  type Brand {
    id: Int
    name: String
    company_name: Int
    rating: Int
    created_by: Int
    updated_by: Int
    is_active: Boolean
  }
  extend type Mutation {
    create_new_brand(input: AddBrandInput!): AddBrandResponse
    update_brand(input: UpdateBrandInput!): UpdateBrandResponse
    delete_brand(id: Int!): DeleteBrandResponse
  }
  type UpdateBrandResponse {
    status: Int
  }
  type DeleteBrandResponse {
    status: Int
  }
  input AddBrandInput {
    name: String
    category_id: Int
    brand_id: Int
    image: String
    rating: Int
    created_by: Int
  }
  type AddBrandResponse {
    name: String
    category_id: Int
    brand_id: Int
  }
  input UpdateBrandInput {
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
