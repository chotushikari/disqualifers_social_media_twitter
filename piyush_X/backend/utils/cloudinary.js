const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary.
 * @param {string} filePath - Path to the file.
 * @param {string} folder - Folder in Cloudinary to store the file.
 * @returns {Promise<object>} - Returns Cloudinary response.
 */
const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return result;
  } catch (error) {
    throw new Error('Cloudinary upload failed');
  }
};

/**
 * Deletes a file from Cloudinary.
 * @param {string} publicId - Public ID of the file in Cloudinary.
 * @returns {Promise<object>} - Returns Cloudinary response.
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Cloudinary delete failed');
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };