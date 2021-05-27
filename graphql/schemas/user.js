const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: Int!
    name: String!
    email_id: String!
    user_type: String
    mobile_no: String
    created_by: Int
    updated_by: Int
    is_active: Boolean
    password: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(input: LoginInput!): LoginResponse
    add_newAdminUser(input: AdminInput!): AdminResponse
  }
  input AdminInput {
    id: Int!
    user_type: String!
    updated_by: Int
    is_active: Int
  }
  type AdminResponse {
    status: Int
  }
  input LoginInput {
    email_id: String!
    password: String!
  }
  type RegisterResponse {
    name: String!
    email_id: String!
    user_type: String
    mobile_no: String
    created_by: Int
  }

  input RegisterInput {
    name: String!
    email_id: String!
    mobile_no: String
    created_by: Int
    password: String!
  }

  type UserBasketProduct {
    id: Int
    name: String
    category_id: Int
    brand_id: Int
    image: String
    rating: Int
    created_by: Int
    updated_by: Int
    is_active: Boolean
    tbl_baskets: tbl_baskets
  }
  type tbl_baskets {
    product_id: Int!
    user_id: Int!
    created_by: Int
    updated_by: Int
    is_active: Boolean
  }
  type LoginResponse {
    id: Int!
    name: String!
    email_id: String!
    user_type: String
    mobile_no: String
    created_by: Int
    updated_by: Int
    is_active: Boolean
    token: String!
    basket: [UserBasketProduct]
  }
`;
