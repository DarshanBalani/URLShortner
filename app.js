const express = require("express");
const PORT = 3000;
const urlRoute = require("./routes/url");
const { connnectMongo } = require("./connect");
const URL = require("./models/url");

const app = express();

connnectMongo("mongodb://localhost:27017/shortUrl").then(() => {
  console.log("MongoDb connected");
});
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.status(201).redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
