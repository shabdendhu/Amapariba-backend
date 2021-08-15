const { tbl_categorys } = require("../../database/models");
const db = require("../../database/models");
const ErroeHandler = require("../../errors");
const { ProductByCategoryId } = require('../dataloader/category')

module.exports = {
  Category: {
    product:ProductByCategoryId
  },
  Mutation: {
    async create_new_category(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { name, created_by } = input;
      return tbl_categorys.create({
        name,
        created_by,
      });
    },
    async update_category(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { id, name, updated_by, is_active } = input;
      const updataRes = await tbl_categorys.update(
        {
          name,
          updated_by,
          is_active,
        },
        { returning: false, where: { id } }
      );
      return { status: updataRes[0] };
    },
    async delete_category(_, { id }, { user = null }) {
      ErroeHandler.is_admin(user);
      const data = tbl_categorys.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allCategory(root, args, context, info) {
      return tbl_categorys.findAll({
        // include: product,
      });
    },
    async get_Category_by_id(_, { id }, context, info) {
      return tbl_categorys.findByPk(id, {
      });
    },
    async get_PopularCategory(_, args, { user }, contex, info) {
      return tbl_categorys.findAll({
        where: { is_popular: 1 },
        // attributes: keyFinder(requiredFilds),
      });
    },
  },

};
