const DataLoader = require("dataloader")
const _ = require("lodash")
const { tbl_brands } = require("../../database/models");
const brandByIdLoader = new DataLoader(async (id) => {
    const data = await tbl_brands.findAll({ where: { id } })
    return data
});
class CategoryLoader {
    brandById(parent, arg, context, info) {
        return brandByIdLoader.load(parent.brand_id)
    }
}
module.exports = new CategoryLoader()