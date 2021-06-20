const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allCategory: [Category]
    get_Category_by_id(id: Int!): Category
    get_PopularCategory:[Category]
  }
  type Category {
    id: Int
    name: String
    image:String
    is_popular:String
    created_by: Int
    updated_by: Int
    is_active: Boolean
    product: [Product]
  }
  type Product {
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
    create_new_category(input: AddCategoryInput!): AddCategoryResponse
    update_category(input: UpdateCategoryInput!): UpdateCategoryResponse
    delete_category(id: Int!): DeleteCategoryResponse
  }
  type UpdateCategoryResponse {
    status: Int
  }
  type DeleteCategoryResponse {
    status: Int
  }
  type AddCategoryResponse {
    id: Int
    image:String
    name: String
  }
  input AddCategoryInput {
    name: String
    created_by: Int
  }
  input UpdateCategoryInput {
    id: Int
    name: String
    updated_by: Int
    is_active: Boolean
  }
`;
