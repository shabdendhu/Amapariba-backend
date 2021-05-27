const { tbl_units } = require("../../database/models");
const ErroeHandler = require("../../errors");

module.exports = {
  Mutation: {
    async create_new_unit(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { full_name, short_name, created_by } = input;
      return tbl_units.create({ full_name, short_name, created_by });
    },
    async update_unit(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { id, full_name, short_name, updated_by, is_active } = input;
      const updataRes = await tbl_units.update(
        { id, full_name, short_name, updated_by, is_active },
        { returning: false, where: { id } }
      );
      return { status: updataRes[0] };
    },
    async delete_unit(_, { id }, { user = null }) {
      ErroeHandler.is_admin(user);
      const data = tbl_units.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allUnit(root, args, context) {
      return tbl_units.findAll();
    },
    async get_Unit_by_id(_, { id }, context) {
      return tbl_units.findByPk(id);
    },
  },
};
