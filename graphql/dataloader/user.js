const DataLoader = require("dataloader")
const _ = require("lodash")
const { moduleMaker } = require("../../commonMethords");
const { tbl_users } = require("../../database/models");
const brandByIdLoader = new DataLoader(async (id) => {
    const data = await tbl_users.findAll({ where: { id } })
    return data
});
class UserLoader {
    userById(parent, arg, context, info) {
        return brandByIdLoader.load(parent.user_id)
    }
}
module.exports = new UserLoader()