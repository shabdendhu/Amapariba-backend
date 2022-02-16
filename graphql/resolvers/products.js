const {
  tbl_products,
  tbl_quantity_options,
  tbl_units,
} = require("../../database/models");
const { Op } = require("sequelize");
const { AuthenticationError } = require("apollo-server-express");
const ErroeHandler = require("../../errors");
const { categoryById } = require("../dataloader/category");
const { brandById } = require("../dataloader/brand");
const { quantityByProductId } = require("../dataloader/quantity");
const { unitById } = require("../dataloader/unit");
const fs = require("fs");
const path = require("path");
module.exports = {
  ProductsQuantityOptions: {
    unit:unitById
  },
  Products: {
    brand:brandById,
    category: categoryById,
    qntity:quantityByProductId
  },
  Mutation: {
    async create_new_product(_, { input }, { user = null }) {
      // ErroeHandler.is_admin(user);
      const { id, name, category_id, brand_id, image, rating, created_by,file } =input;
      const { createReadStream, filename, mimetype, encoding } = await file;
      const file_name = filename.replace(" ", "");
      const stream = createReadStream();
      const pathName = path.join(__dirname, `../../public/product-images/${file_name}`);
      stream.pipe(fs.createWriteStream(pathName));
      await tbl_products.create({
        id,
        name,
        category_id,
        brand_id,
        image:`/product-images/${file_name}`,
        rating,
        created_by,
      });
      return {
        url:`/product-images/${file_name}`
      }
    },
    async update_product(_, { input }, { user = null }) {
      // ErroeHandler.is_admin(user);
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
      const { createReadStream, filename, mimetype, encoding } = await file;
      const file_name = filename.replace(" ", "");
      const stream = createReadStream();
      const pathName = path.join(__dirname, `../../public/product-images/${file_name}`);
      stream.pipe(fs.createWriteStream(pathName));
      const oldPath=path.join(__dirname, `../../public${imageUrl}`)
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {});
      }

      const updataRes = await tbl_products.update(
        {
          name,
          category_id,
          brand_id,
          image:`/product-images/${file_name}`,
          rating,
          updated_by,
          is_active,
        },
        { returning: false, where: { id } }
      );
      return { url: `/product-images/${file_name}` };
    },
    async delete_product(_, { id }, { user = null }) {
      ErroeHandler.is_admin(user);
      if (!user) {
        throw new AuthenticationError("You must login first");
      }
      const data = tbl_products.destroy({ where: { id: id } });
      return { status: data };
    },
  },

  Query: {
    async get_allProduct(root, args, { user = null }) {
      // ErroeHandler.is_authenticated(user);
      const data = await tbl_products.findAll({
        include: [
          // "category", "brand",
          "qntity"],
      });

      return data;
    },
    async get_product_by_id(_, { id }, context) {
      // ErroeHandler.is_authenticated(user);
      return tbl_products.findByPk(id);
    },
    async get_product_by_name(_, { name }, context) {
      return tbl_products.findAll({
        // include: [
        //   "category",
        //   "brand",
        //   {
        //     model: tbl_quantity_options,
        //     as: "qntity",
        //     include: {
        //       model: tbl_units,
        //       as: "unit",
        //       // include: [ /* etc */]
        //     },
        //   },
        // ],
        limit: 10,
        where: { name: { [Op.like]: "%" + name + "%" } },
        // attributes: ["id", "name"],
      });
    },
    async get_product_by_category(_, { category_id }, { user = null }) {
      // ErroeHandler.is_authenticated(user);
      const data = await tbl_products.findAll({
        // include: ["category", "brand", "qntity"],
        include: [
          "category",
          "brand",
          {
            model: tbl_quantity_options,
            as: "qntity",
            include: {
              model: tbl_units,
              as: "unit",
              // include: [ /* etc */]
            },
          },
        ],

        where: { category_id },
      });
      console.log("data[0]data[0]data[0]", data[0].qntity[0].unit);
      return data;
    },
  },
};
