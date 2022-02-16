const fs = require("fs");
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
  fileUploader=(file,path)=>{
    const { createReadStream, filename, mimetype, encoding } =  file;
    const file_name = filename.replace(" ", "");
    const pathName = path.join(__dirname, `${path}${file_name}`);
    const stream = createReadStream();
    stream.pipe(fs.createWriteStream(pathName));
  }
  fileEditor=(file,path,imageUrl)=>{
    const { createReadStream, filename, mimetype, encoding } =  file;
    const file_name = filename.replace(" ", "");
    const stream = createReadStream();
    const pathName = path.join(__dirname, `${path}${file_name}`);
    stream.pipe(fs.createWriteStream(pathName));
    const oldPath=path.join(__dirname, `${path}${imageUrl}`)
    if (fs.existsSync(oldPath)) {
      fs.unlink(oldPath, (err) => {});
    }
  }
}
module.exports = new CommonMethords();
