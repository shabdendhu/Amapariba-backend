const {
    tbl_seasons_best,
    tbl_quantity_options,
    tbl_units,
    tbl_products,
  } = require("../../database/models");
  const ErroeHandler = require("../../errors");
  
  module.exports = {
    Mutation: {
      async add_new_SeasonsBest(_, { input }, { user = null }) {
        ErroeHandler.is_admin(user);
        const { product_id,is_popular, created_by } = input;
        const data = await tbl_seasons_best.create({ product_id,is_popular,created_by });
        console.log(data);
        if (data) {
          return { status: 1 };
        }
        
      },
    },
  
    Query: {
      async get_allSeasonsBest(root, args, context) {
        const data = await tbl_seasons_best.findAll({
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
  