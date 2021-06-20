const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allSeasonsBest: [SeasonsBest]
  }
  type SeasonsBest {
    id: Int
    product_id: String
    is_popular:Boolean
    Products: Products
  }
  extend type Mutation {
    add_new_SeasonsBest(input: AddSeasonsBest!): AddSeasonsBestRes
  }
  input AddSeasonsBest {
    product_id: Int
    is_popular:Boolean
    created_by: Int
  }
  type AddSeasonsBestRes {
    status: Int
  }
`;
