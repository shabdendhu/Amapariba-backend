const DataLoader = require("dataloader")
const _ = require("lodash")
const { tbl_quantity_options } = require("../../database/models");
const quantityByProductIdLoader = new DataLoader(async (id) => {
    const data = await tbl_quantity_options.findAll({
        // include: ["unit"],
        where: { product_id: id }
    })
    const gs = _.groupBy(data, 'product_id')
    return id.map(k => gs[k] || [])
});
const quantityByIdLoader = new DataLoader(async (id) => {
    const data = await tbl_quantity_options.findAll({
        // include: ["unit"],
        where: { id: id }
    })
    // const gs = _.groupBy(data, 'product_id')
    return data
});
class CategoryLoader {
    quantityByProductId(parent, arg, context, info) {
        return quantityByProductIdLoader.load(parent.id)
    }
    quantityById(parent, arg, context, info) {
        return quantityByIdLoader.load(parent.quantity_id)
    }
}
module.exports = new CategoryLoader()