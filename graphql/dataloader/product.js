const DataLoader = require("dataloader")
const _ = require("lodash")
const { tbl_categorys, tbl_products } = require("../../database/models");
const ProductByIdLoader = new DataLoader(async (id) => {
    const data = await tbl_products.findAll({raw: true, where: { id: id }})
    // const gs = _.groupBy(data, 'category_id')
    return data
});
class ProductLoader {
    ProductById(parent, args, context, info) {
        console.log(parent)
        return ProductByIdLoader.load(parent.product_id);
    }
}
module.exports = new ProductLoader()