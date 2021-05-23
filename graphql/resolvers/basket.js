const { tbl_baskets } = require("../../database/models");
module.exports = {
  Mutation: {
    async create_new_basket(_, { input }) {
      const { product_id, user_id, created_by } = input;
      return tbl_baskets.create({ product_id, user_id, created_by });
    },
    async update_basket(_, { input }) {
      const { id, product_id, user_id, updated_by, is_active } = input;
      const updataRes = await tbl_baskets.update(
        { id, product_id, user_id, updated_by, is_active },
        { returning: false, where: { id } }
      );
      return { status: updataRes[0] };
    },
    async delete_basket(_, { id }) {
      const data = tbl_baskets.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allBasket(root, args, context) {
      return tbl_baskets.findAll({
        include: ["product", "user"],
      });
    },
    async get_basket_by_id(_, { id }, context) {
     
      return tbl_baskets.findAll({
        include: ["product", "user"],
        where: { user_id: id },
      });
    },
  },
};
