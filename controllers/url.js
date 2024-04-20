const URL = require("../models/url");
const shortid = require("shortid");

async function handleNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ error: "You must provide a url" });
  const shortId = shortid(body);

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).json({ id: shortId, msg: "success" });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  res.json({
    totalClicks: result.visitHistory.length,
    clickData: result.visitHistory,
  });
}

module.exports = { handleNewShortUrl, handleAnalytics };
