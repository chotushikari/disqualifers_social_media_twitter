const express = require("express");
const { getTweetsByHashtag } = require("../controllers/hashtagController");
const router = express.Router();

router.get("/:tag", getTweetsByHashtag);

module.exports = router;
