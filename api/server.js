const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("../graphql/schemas");
const resolvers = require("../graphql/resolvers");
const context = require("../graphql/context");
// const customerappRoutes = require("");

const app = express();

app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      "schema.polling.enable": false,
    },
  },
});
// customerappRoutes(app, "/customer-app");

apolloServer.applyMiddleware({ app, path: "/api" });

const server = createServer(app);

module.exports = server;
