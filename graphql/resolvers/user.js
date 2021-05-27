const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");
const ErrorHandler = require("../../errors");
const { tbl_users } = require("../../database/models");

module.exports = {
  Mutation: {
    async register(root, { input }, context) {
      const { name, password, email_id, mobile_no } = input;
      return tbl_users.create({ name, password, email_id, mobile_no });
    },
    async add_newAdminUser(_, { input }, { user = null }) {
      ErrorHandler.is_Manager(user);
      const { user_type, id } = input;
      const updataRes = await tbl_users.update(
        { user_type },
        { where: { id: id } }
      );
      return { status: updataRes[0] };
    },
    async login(root, { input }, context) {
      const { email_id, password } = input;
      const user = await tbl_users.findOne({
        include: ["basket"],
        where: { email_id },
      });
      if (user && password === user.password) {
        const token = jwt.sign({ id: user.id }, "mySecret");
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError("Invalid credentials");
    },
  },
};
