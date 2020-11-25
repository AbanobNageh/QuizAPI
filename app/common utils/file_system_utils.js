const fileSystem = require("fs");

module.exports.deleteFile = async filePath => {
  console.log("deleting image with path");
  console.log(filePath);
  if (await this.isFile(filePath)) {
    fileSystem.unlinkSync(filePath);
    return;
  }
};

module.exports.isFile = async filePath => {
  try {
    if (fs.existsSync(filePath)) {
      return true;
    }
    else {
        return false;
    }
  } catch (err) {
    return false;
  }
};
