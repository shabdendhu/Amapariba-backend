const DataLoader = require("dataloader")
const _ = require("lodash")
const { tbl_categorys, tbl_products } = require("../../database/models");
const ProductByCategoryLoader = new DataLoader(async (id) => {
    const data = await tbl_products.findAll({raw: true, where: { category_id: id }})
    const gs = _.groupBy(data, 'category_id')
    return id.map(k => gs[k] || [])
});
const categoryByIdLoader = new DataLoader(async (id) => {
    const data = await tbl_categorys.findAll({ where: { id } })
    return data
});
class CategoryLoader {
    ProductByCategoryId(parent, args, context, info) {
        return ProductByCategoryLoader.load(parent.id);
    }
    categoryById(parent, arg, context, info) {
        return categoryByIdLoader.load(parent.category_id)
    }
}
module.exports = new CategoryLoader()