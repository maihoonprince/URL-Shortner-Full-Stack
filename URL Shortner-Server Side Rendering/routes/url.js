const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

// to calculate number of clicks on our short url...
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;