module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log error for debugging
  res.status(err.status || 500).json({
    error: err.message || 'An internal server error occurred',
  });
};