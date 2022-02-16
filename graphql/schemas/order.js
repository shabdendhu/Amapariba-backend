const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_AllOrder: [Order]
    get_OrderById(id: String!): [Order]
  }
  type Order {
    id: Int
    user_id:Int
    product_id:Int
    users: User
    products: Products
  }
  extend type Mutation {
    create_newOrder(input: OrderInputs!): AddOrderRes
  }
  input OrderInputs {
    basket_id: [Int]
    order_no: Int
    user_id: Int
    order_status:String
  }
  type AddOrderRes{
      status:Int
  }
`;
