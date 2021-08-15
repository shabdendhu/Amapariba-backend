const parseFields = require("graphql-parse-fields");
class CommonMethords {
  moduleMaker = (info) => {
    const object = parseFields(info)
    if (object) {
      let Keys = Object.keys(object).filter(isPositive);
      function isPositive(value) {
        return typeof object[value] !== "object";
      }
      return Keys;
    }
  };
}
module.exports = new CommonMethords();
