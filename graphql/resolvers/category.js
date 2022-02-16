const { tbl_categorys } = require("../../database/models");
const db = require("../../database/models");
const ErroeHandler = require("../../errors");
const { ProductByCategoryId } = require("../dataloader/category");
const fs = require("fs");
const path = require("path");
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require("graphql-upload");
module.exports = {
  Upload: GraphQLUpload,
  Category: {
    product: ProductByCategoryId,
  },
  Mutation: {
    async create_new_category(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { name, created_by, file } = input;
      const { createReadStream, filename, mimetype, encoding } = await file;
      const file_name = filename.replace(" ", "");
      const stream = createReadStream();
      const pathName = path.join(__dirname, `../../public/images/${file_name}`);
      stream.pipe(fs.createWriteStream(pathName));
      tbl_categorys.create({
        image: `/images/${file_name}`,
        name,
        created_by,
      });
      return {
        url: `/images/${file_name}`,
      };
    },
    async update_category(_, { input }, { user = null }) {
      ErroeHandler.is_admin(user);
      const { id, name, updated_by, is_active, imageUrl, file } = input;
      const { createReadStream, filename, mimetype, encoding } = await file;
      const file_name = filename.replace(" ", "");
      const stream = createReadStream();
      const pathName = path.join(__dirname, `../../public/images/${file_name}`);
      stream.pipe(fs.createWriteStream(pathName));
      const oldPath=path.join(__dirname, `../../public${imageUrl}`)
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {});
      }
      const updataRes = await tbl_categorys.update(
        {
          image: `/images/${file_name}`,
          name,
          updated_by,
          is_active,
        },
        { returning: false, where: { id } }
      );
      console.log(updataRes)
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
      return tbl_categorys.findByPk(id, {});
    },
    async get_PopularCategory(_, args, { user }, contex, info) {
      return tbl_categorys.findAll({
        where: { is_popular: 1 },
        // attributes: keyFinder(requiredFilds),
      });
    },
  },
};
