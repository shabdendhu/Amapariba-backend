const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");
const ErrorHandler = require("../../errors");
const { tbl_users, tbl_baskets } = require("../../database/models");

module.exports = {
  Mutation: {
    async register(root, { input }, context) {
      const { name, password, gender, dob, email_id, mobile_no } = input;
      const data = await tbl_users.create({
        name,
        password,
        email_id,
        mobile_no,
        gender,
        dob,
      });
      return {
        status: true,
        message: "fetched",
        data: data,
      };
    },
    async update_user(_, { input }, { user = null }) {
      const { id, name, gender, dob, email_id, mobile_no } = input;
      const updateRes = await tbl_users
        .update(
          { name, gender, dob, email_id, mobile_no },
          { where: { id: id }, returning: true }
        )
        .then(async (res) => {
          return await tbl_users.findOne({
            where: { email_id },
          });
        });
      // const updatedUser = await tbl_users.findOne({
      //   where: { email_id },
      // });
      console.log(updateRes);
      return {
        status: true,
        message: "fetched",
        data: updateRes,
      } ;
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
      console.log("tripathyswoyamprava@gmail.com", email_id);
      const user = await tbl_users.findOne({
        // include: ["basket"],
        // include: [
        //   {
        //     model: tbl_baskets,
        //     as: "basket",
        //     include: {
        //       model: tbl_users,
        //       as: "user",
        //     },
        //   },
        // ],
        where: { email_id },
      });
      if (user && password === user.password) {
        const token = jwt.sign({ id: user.id }, "mySecret");
        return {
          status: true,
          message: "fetched",
          data: { ...user.toJSON(), token },
        };
      } else {
        return {
          status: false,
          message: "Email & Password Doesnot Match",
        };
      }
    },
  },
};
