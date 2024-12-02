const { body, validationResult } = require("express-validator");

const validateTweet = [
  body("content").notEmpty().withMessage("Tweet content cannot be empty").isLength({ max: 280 }).withMessage("Tweet content cannot exceed 280 characters."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUser = [
  body("email").isEmail().withMessage("Enter a valid email address."),
  body("password").isLength({ min: 6 }).withMessage("Password should be at least 6 characters long."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateTweet, validateUser };
