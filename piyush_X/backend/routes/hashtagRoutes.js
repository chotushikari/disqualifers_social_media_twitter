const express = require('express');
const { getTweetsByHashtag } = require('../controllers/hashtagController');

const router = express.Router();

router.get('/:tag', getTweetsByHashtag); // Get tweets by hashtag

module.exports = router;