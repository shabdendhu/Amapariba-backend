const { tbl_brands } = require("../../database/models");
const ErroeHandler = require("../../errors");

module.exports = {
  Mutation: {
    async create_new_brand(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { name, company_name, ratings, created_by } = input;
      return tbl_brands.create({ name, company_name, ratings, created_by });
    },
    async update_brand(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { id, name, company_name, ratings, updated_by, is_active } = input;
      const updataRes = await tbl_brands.update(
        { id, name, company_name, ratings, updated_by, is_active },
        { returning: false, where: { id } }
      );
      return { status: updataRes[0] };
    },
    async delete_brand(_, { id }, { user = null }) {
      ErroeHandler.is_admin(user);
      const data = tbl_brands.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allBrand(root, args, context) {
      return tbl_brands.findAll();
    },
    async get_brand_by_id(_, { id }, context) {
      return tbl_brands.findByPk(id);
    },
  },
};
