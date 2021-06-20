const {
  tbl_baskets,
  tbl_quantity_options,
  tbl_units,
} = require("../../database/models");
module.exports = {
  Mutation: {
    async create_new_basket(_, { input }) {
      const { product_id, quantity_id, user_id, created_by } = input;
      const AddResponse = await tbl_baskets.create({
        product_id,
        quantity_id,
        user_id,
        created_by,
      });
      const data = await tbl_baskets.findAll({
        include: ["product"],
        where: { id: AddResponse.id },
      });
      console.log(data[0].quantityOption);
      return data[0];
    },
    async update_basket(_, { input }) {
      const { id, is_active } = input;
      const updataRes = await tbl_baskets.update(
        { is_active },
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
      const data = await tbl_baskets.findAll({
        include: ["product", "user"],
      });
      return data;
    },
    async get_basket_by_id(_, { id }, context) {
      return tbl_baskets.findAll({
        include: [
          "product","user",
          {
            model: tbl_quantity_options,
            as: "quantityOption",
            include: {
              model: tbl_units,
              as: "unit",
              // include: [ /* etc */]
            },
          },
        ],
        where: { user_id: id },
      });
    },
  },
};
