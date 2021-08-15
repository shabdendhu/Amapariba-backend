const DataLoader = require("dataloader")
const _ = require("lodash")
const { tbl_units } = require("../../database/models");
const unitByIdLoader = new DataLoader(async (id) => {
    const data = await tbl_units.findAll({ where: { id } })
    return data
});
class UnitLoader {
    unitById(parent, arg, context, info) {
        return unitByIdLoader.load(parent.unit_id)
    }
}
module.exports = new UnitLoader()