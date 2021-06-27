const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allBasket(id:Int): [MyHistory]
    get_basket_by_id(id: Int!): [Basket]
  }
  type MyHistory{
    id:Int
    product:Products
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
    quantityOption: QuantityOptions
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
    quantity_id: Int!
    user_id: Int!
    created_by: Int
  }
  type AddBasketResponse {
    id: Int
    product_id: Int
    user_id: Int
    created_by: Int
    product: AddBasketResponseProduct
    quantityOption: AddBasketResponsequantityOption
  }
  type AddBasketResponsequantityOption {
    id: Int
    quantity: Int
    product_id: Int
    base_price: Int
    unit_id: Int
    discount: Int
    unit: AddBasketResponsequantityOptionUnit
  }
  type AddBasketResponsequantityOptionUnit {
    id: Int
    full_name: String
    short_name: String
  }
  type AddBasketResponseProduct {
    id: Int
    name: String
    image: String
  }
  input UpdateBasketInput {
    id: Int!
    is_active: Int
  }
`;
