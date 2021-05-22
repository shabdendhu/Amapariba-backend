const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allQuantityOptions: [QuantityOptions]
    get_quantityOptions_by_id(id: Int!): QuantityOptions
  }
  type QuantityOptions {
    id:Int!
    quantity:Int!
    product_id:Int!
    base_price:Int!
    unit_id:Int
    discount:Int
    created_by:Int
    updated_by:Int
    is_active:Boolean
  }
  extend type Mutation {
    create_new_quantityOptions(input: AddQuantityOptionsInput!): AddQuantityOptionsResponse
    update_quantityOptions(input: UpdateQuantityOptionsInput!): UpdateQuantityOptionsResponse
    delete_quantityOptions(id: Int!): DeleteQuantityOptionsResponse
  }
  type UpdateQuantityOptionsResponse {
    status: Int
  }
  type DeleteQuantityOptionsResponse {
    status: Int
  }
  input AddQuantityOptionsInput {
    quantity:Int!
    product_id:Int!
    base_price:Int!
    unit_id:Int
    discount:Int
    created_by:Int
  }
  type AddQuantityOptionsResponse {
    id:Int!
    quantity:Int!
    product_id:Int!
    base_price:Int!
    unit_id:Int
    discount:Int
    created_by:Int
  }
  input UpdateQuantityOptionsInput {
    id:Int!
    quantity:Int!
    product_id:Int!
    base_price:Int!
    unit_id:Int
    discount:Int
    created_by:Int
    updated_by:Int
    is_active:Boolean
  }
`;
