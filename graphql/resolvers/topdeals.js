const {
  tbl_topdeal,
  tbl_quantity_options,
  tbl_units,
  tbl_products,
} = require("../../database/models");
const ErroeHandler = require("../../errors");

module.exports = {
  Mutation: {
    async add_new_TopDeals(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { product_id, created_by } = input;
      const data = await tbl_topdeal.create({ product_id, created_by });
      console.log(data);
      if (data) {
        return { status: 1 };
      }
      
    },
  },

  Query: {
    async get_allTopDeals(root, args, context) {
      const data = await tbl_topdeal.findAll({
        include: [
          {
            model: tbl_products,
            as: "Products",
            include: {
              model: tbl_quantity_options,
              as: "qntity",
              include: {
                model: tbl_units,
                as: "unit",
              },
            },
          },
        ],
      });
      return data;
    },
  },
};
