const moment = require("moment");

// Format a date to a more readable format
const formatDate = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

// Generate a random string (could be used for unique IDs)
const generateRandomString = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

module.exports = { formatDate, generateRandomString };
