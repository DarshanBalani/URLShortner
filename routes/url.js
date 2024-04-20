const express = require("express");
const { handleNewShortUrl, handleAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleNewShortUrl);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
