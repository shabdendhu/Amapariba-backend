const { tbl_quantity_options } = require("../../database/models");
module.exports = {
  Mutation: {
    async create_new_quantityOptions(_, { input }) {
      const { full_name, short_name, created_by } = input;
      return tbl_quantity_options.create({ full_name, short_name, created_by });
    },
    async update_quantityOptions(_, { input }) {
      const { id, full_name, short_name, updated_by, is_active } = input;
      const updataRes = await tbl_quantity_options.update(
        { id, full_name, short_name, updated_by, is_active },
        { returning: false, where: { id } }
      );
      return { status: updataRes[0] };
    },
    async delete_quantityOptions(_, { id }) {
      const data = tbl_quantity_options.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allQuantityOptions(root, args, context) {
      return tbl_quantity_options.findAll();
    },
    async get_quantityOptions_by_id(_, { id }, context) {
      return tbl_quantity_options.findAll({ where: { product_id: id } });
    },
  },
};
