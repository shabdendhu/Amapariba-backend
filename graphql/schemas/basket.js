const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allBasket: [Basket]
    get_basket_by_id(id: Int!): [Basket]
  }
  type Basket {
    id: Int!
    product_id: Int!
    user_id: Int!
    created_by: Int
    updated_by: Int
    is_active: Boolean
    product: BasketProduct
    user: BasketUser
  }
  type BasketUser {
    id: Int!
    name: String!
    email_id: String!
    user_type: String
    mobile_no: String
    created_by: Int
    updated_by: Int
    is_active: Boolean
  }
  type BasketProduct {
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
    create_new_basket(input: AddBasketInput!): AddBasketResponse
    update_basket(input: UpdateBasketInput!): UpdateBasketResponse
    delete_basket(id: Int!): DeleteBasketResponse
  }
  type UpdateBasketResponse {
    status: Int
  }
  type DeleteBasketResponse {
    status: Int
  }
  input AddBasketInput {
    product_id: Int!
    user_id: Int!
    created_by: Int
  }
  type AddBasketResponse {
    id: Int!
    product_id: Int!
    user_id: Int!
    created_by: Int
  }
  input UpdateBasketInput {
    id: Int!
    product_id: Int!
    user_id: Int!
    created_by: Int
    updated_by: Int
    is_active: Boolean
  }
`;
