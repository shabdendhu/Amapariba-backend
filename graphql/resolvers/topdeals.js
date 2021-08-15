const {
  tbl_topdeal,
  tbl_quantity_options,
  tbl_units,
  tbl_products,
  tbl_categorys,
  tbl_brands,
} = require("../../database/models");
// const parseFields = require("graphql-parse-fields");

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
    async get_allTopDeals(root, args, context, info) {
      // const requiredFilds = fild_finder(info);
      // console.log(requiredFilds);
      // let product = [];
      // if (requiredFilds.product) {
      //   product.push({
      //     model: tbl_products,
      //     as: "product",
      //     attributes: keyFinder(requiredFilds.product),
      //   });
      // }
      // console.log(keyFinder(requiredFilds.Products));
      const data = await tbl_topdeal.findAll({
        include: [
          {
            model: tbl_products,
            as: "Products",
            // attributes: keyFinder(requiredFilds.Products),
            include: {
              model: tbl_quantity_options,
              as: "qntity",
              // attributes: keyFinder(requiredFilds.Products.qntity),
              include: {
                model: tbl_units,
                as: "unit",
                // attributes: keyFinder(requiredFilds.Products.unit),
              },
            },
          },
        ],
        // attributes: keyFinder(requiredFilds),
      });
      return data;
    },
  },
};
