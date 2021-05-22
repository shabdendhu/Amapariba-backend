const { gql } = require('apollo-server-express');

module.exports = gql`

 type User {
     id: Int!
     name: String!
     email_id: String!
     user_type:String
     mobile_no:String
     created_by:Int
     updated_by:Int
     is_active:Boolean
     password: String!
 }

 extend type Mutation {
     register(input: RegisterInput!): RegisterResponse
     login(input: LoginInput!): LoginResponse
 }

 type RegisterResponse {
    name: String!
     email_id: String!
     user_type:String
     mobile_no:String
     created_by:Int
 }

 input RegisterInput {
    name: String!
    email_id: String!
    mobile_no:String
    created_by:Int
    password: String!
 }

 input LoginInput {
    email_id: String!
     password: String!
 }

 type LoginResponse {
    id: Int!
     name: String!
     email_id: String!
     user_type:String
     mobile_no:String
     created_by:Int
     updated_by:Int
     is_active:Boolean
     password: String!
 }
`;
