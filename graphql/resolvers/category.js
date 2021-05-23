const { tbl_categorys } = require("../../database/models");
module.exports = {
  Mutation: {
    async create_new_category(_, { input }) {
      const { name, created_by } = input;
      return tbl_categorys.create({
        name,
        created_by,
      });
    },
    async update_category(_, { input }) {
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
    async delete_category(_, { id }) {
      const data = tbl_categorys.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allCategory(root, args, context) {
      // const data =await tbl_categorys.findAll({
      //   include: ["product"],
      // })
      // console.log(data[0].dataValues.product[1].dataValues);
      return tbl_categorys.findAll({
        include: ["product"],
      });
    },
    async get_Category_by_id(_, { id }, context) {
      console.log("tbl_categorys.findAll()");
      return tbl_categorys.findByPk(id);
    },
  },
};
