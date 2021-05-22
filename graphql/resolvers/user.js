// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const { AuthenticationError } = require("apollo-server-express");

const { tbl_users } = require("../../database/models");

module.exports = {
  Mutation: {
    async register(root, { input }, context) {
      const { name, password, email_id, mobile_no } = input;
      return tbl_users.create({ name, password, email_id, mobile_no });
    },

    async login(root, { input }, context) {
      const { email_id, password } = input;
      const user = await tbl_users.findOne({ where: { email_id } }).then((data) => {
        console.log(data.dataValues.password)
        if (password === data.dataValues.password) {
          return data.dataValues;
        } else {
          throw new AuthenticationError("Invalid credentials");
        }
      });
      return user
      //   if (user && bcrypt.compareSync(password, user.password)) {
      //     const token = jwt.sign({ id: user.id }, 'mySecret');
      //     return { ...user.toJSON(), token };
      //   }
      //   throw new AuthenticationError('Invalid credentials');
    },
  },
};
