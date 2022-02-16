const { QueryTypes } = require("sequelize");
const {
  tbl_order_items,
  tbl_baskets,
  tbl_products,
  tbl_order_details,
} = require("../../database/models");
const db = require("../../database/models");
const ErroeHandler = require("../../errors");
const { ProductById } = require("../dataloader/product");
const { userById } = require("../dataloader/user");

module.exports = {
  Order: {
    users: userById,
    products: ProductById,
  },
  Mutation: {
    async create_newOrder(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      // console.log(input.basket_id);
      const { basket_id, user_id, order_status } = input;
      let q = `SELECT count(*) as row_count FROM tbl_order_details;`;
      const [{ row_count }] = await db.sequelize.query(q, {
        raw: true,
        type: QueryTypes.SELECT,
      });
      const { order_no } = await tbl_order_details.create({
        order_no: row_count + 1,
        order_status: "created",
      });
      const NewOrderIten = [];
      for (let index = 0; index < basket_id.length; index++) {
        const element = basket_id[index];
        const { id } = await tbl_order_items.create({
          basket_id: element,
          order_no_id: order_no,
          user_id,
          order_status,
        });
        NewOrderIten.push(id);
        if (index + 1 == basket_id.length) {
          return { status: 1 };
        } 
      }
    },
  },

  Query: {
    async get_AllOrder(_, args, contex, info) {
      const order = await tbl_order_items.findAll({
        attributes: ["id", "user_id"],
        include: [
          {
            model: tbl_baskets,
            as: "Basket",
            attributes: ["id"],
            include: [
              {
                model: tbl_products,
                as: "product",
                attributes: ["id"],
              },
            ],
          },
        ],
      });
      const data = [];
      order.forEach((element) => {
        data.push({
          id: element.id,
          user_id: element.user_id,
          product_id: element.Basket.product.id,
        });
      });

      //   console.log(order[0].Basket.product);
      return data;
    },
    async get_OrderById(_, args, contex, info) {
      const order = await tbl_order_items.findAll({
        attributes: ["id", "user_id"],
        include: [
          {
            model: tbl_baskets,
            as: "Basket",
            attributes: ["id"],
            include: [
              {
                model: tbl_products,
                as: "product",
                attributes: ["id"],
              },
            ],
          },
        ],
        where: { order_no: args.id },
      });
      const data = [];
      order.forEach((element) => {
        data.push({
          id: element.id,
          user_id: element.user_id,
          product_id: element.Basket.product.id,
        });
      });
      return data;
    },
  },
};
