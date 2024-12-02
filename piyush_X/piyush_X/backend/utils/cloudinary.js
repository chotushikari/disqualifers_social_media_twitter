const cloudinary = require("cloudinary").v2;

// Set Cloudinary config using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload an image to Cloudinary
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "tweets_media",
    });
    return result;
  } catch (err) {
    console.error("Cloudinary upload error: ", err);
    throw new Error("Error uploading image to Cloudinary.");
  }
};

module.exports = { uploadImage };
