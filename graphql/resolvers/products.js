const { tbl_products } = require("../../database/models");
module.exports = {
  Mutation: {
    async create_new_product(_, { input }) {
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
    async update_product(_, { input }) {
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
    async delete_product(_, { id }) {
      const data = tbl_products.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allProduct(root, args, context) {
      return tbl_products.findAll();
    },
    async get_product_by_id(_, { id }, context) {
      return tbl_products.findByPk(id);
    },
  },

  // Product: {
  //   author(post) {
  //     return post.getAuthor();
  //   },

  //   comments(post) {
  //     return post.getComments();
  //   },
  // },
};
