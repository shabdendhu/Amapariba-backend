const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("../graphql/schemas");
const resolvers = require("../graphql/resolvers");
const context = require("../graphql/context");
// const customerappRoutes = require("");
const {
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const app = express();
app.use(graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }));
app.use(cors());
app.use(express.static('public'));  
app.use('/images', express.static('images'));
const apolloServer = new ApolloServer({
  uploads: false,
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
