const fs = require('fs');
const path = require('path');

/**
 * Deletes a file from the local file system.
 * @param {string} filePath - Path to the file to delete.
 */
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(File deleted: ${filePath});
    }
  } catch (error) {
    console.error(Error deleting file: ${error.message});
  }
};

/**
 * Resolves a path to the uploads directory.
 * @param {string} fileName - Name of the file.
 * @returns {string} - Full path to the file.
 */
const getUploadPath = (fileName) => {
  return path.join(__dirname, '../uploads', fileName);
};

module.exports = { deleteFile, getUploadPath };