const mongoose = require("mongoose");

async function connnectMongo(url) {
  return mongoose.connect(url);
}

module.exports = { connnectMongo };
