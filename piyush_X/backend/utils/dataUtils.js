/**
 * Paginates data.
 * @param {Array} data - Array of items.
 * @param {number} page - Current page number.
 * @param {number} pageSize - Number of items per page.
 * @returns {object} - Paginated data.
 */
const paginate = (data, page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const paginatedData = data.slice(offset, offset + pageSize);
  return {
    page,
    pageSize,
    total: data.length,
    totalPages: Math.ceil(data.length / pageSize),
    data: paginatedData,
  };
};

/**
 * Extract hashtags from a string.
 * @param {string} content - Input text.
 * @returns {Array<string>} - Array of unique hashtags.
 */
const extractHashtags = (content) => {
  const regex = /#[a-zA-Z0-9_]+/g;
  const matches = content.match(regex);
  return matches ? [...new Set(matches.map(tag => tag.slice(1)))] : [];
};

module.exports = { paginate, extractHashtags };