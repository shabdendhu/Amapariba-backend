const { tbl_quantity_options } = require("../../database/models");
const ErroeHandler = require("../../errors");

module.exports = {
  Mutation: {
    async create_new_quantityOptions(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      // console.log(input);
      const {
        quantity,
        product_id,
        base_price,
        unit_id,
        discount,
        created_by,
      } = input;
      return tbl_quantity_options.create({
        quantity,
        product_id,
        base_price,
        unit_id,
        discount,
        created_by,
      });
    },
    async update_quantityOptions(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { id, full_name, short_name, updated_by, is_active } = input;
      const updataRes = await tbl_quantity_options.update(
        { id, full_name, short_name, updated_by, is_active },
        { returning: false, where: { id } }
      );
      return { status: updataRes[0] };
    },
    async delete_quantityOptions(_, { id }, { user = null }) {
      ErroeHandler.is_admin(user);
      const data = tbl_quantity_options.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allQuantityOptions(root, args, context) {
      const data = await tbl_quantity_options.findAll();
      // console.log(data);
      return data;
    },
    async get_quantityOptions_by_id(_, { id }, context) {
      const data = await tbl_quantity_options.findAll({
        include: ["product", "unit"],
        where: { product_id: id },
      });
      // console.log(data);
      return data;
    },
  },
};
