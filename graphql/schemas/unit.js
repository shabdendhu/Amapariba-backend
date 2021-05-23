const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    get_allUnit: [Unit]
    get_Unit_by_id(id: Int!): Unit
  }
  type Unit {
    id: Int
    full_name: String
    short_name: String
    created_by: Int
    updated_by: Int
    is_active: Boolean
  }
  extend type Mutation {
    create_new_unit(input: AddUnitInput!): AddUnitResponse
    update_unit(input: UpdateUnitInput!): UpdateUnitResponse
    delete_unit(id: Int!): DeleteUnitResponse
  }
  type UpdateUnitResponse {
    status: Int
  }
  type DeleteUnitResponse {
    status: Int
  }
  input AddUnitInput {
    full_name: String
    short_name: String
    created_by: Int
  }
  type AddUnitResponse {
    full_name: String
    short_name: String
  }
  input UpdateUnitInput {
    id: Int
    full_name: String
    short_name: String
    created_by: Int
    updated_by: Int
    is_active: Boolean
  }
`;
