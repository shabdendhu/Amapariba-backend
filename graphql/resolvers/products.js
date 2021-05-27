const { tbl_products } = require("../../database/models");
const { AuthenticationError } = require("apollo-server-express");
const ErroeHandler = require("../../errors");
module.exports = {
  Mutation: {
    async create_new_product(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { id, name, category_id, brand_id, image, rating, created_by } =
        input;
      return tbl_products.create({
        id,
        name,
        category_id,
        brand_id,
        image,
        rating,
        created_by,
      });
    },
    async update_product(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const {
        id,
        name,
        category_id,
        brand_id,
        image,
        rating,
        updated_by,
        is_active,
      } = input;

      const updataRes = await tbl_products.update(
        {
          name,
          category_id,
          brand_id,
          image,
          rating,
          updated_by,
          is_active,
        },
        { returning: false, where: { id } }
      );
      return { status: updataRes[0] };
    },
    async delete_product(_, { id }, { user = null }) {
      ErroeHandler.is_admin(user);
      if (!user) {
        throw new AuthenticationError("You must login to create a comment");
      }
      const data = tbl_products.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allProduct(root, args, { user = null }) {
      if (!user) {
        throw new AuthenticationError("You must login to create a comment");
      }
    },
    async get_product_by_id(_, { id }, context) {
      return tbl_products.findByPk(id);
    },
  },
};
