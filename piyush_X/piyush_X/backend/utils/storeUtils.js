const fs = require("fs");
const path = require("path");

// Save a file to the local file system
const saveFileToLocal = (file, directory) => {
  const filePath = path.join(directory, file.originalname);
  fs.writeFileSync(filePath, file.buffer);
  return filePath;
};

module.exports = { saveFileToLocal };
