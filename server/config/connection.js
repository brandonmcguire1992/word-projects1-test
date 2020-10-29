const mongoose = require("mongoose");

mongoose.connect(
  // process.env.MONGODB_URI || "mongodb://localhost/wordsprojects",
  "mongodb://localhost/wordsprojects",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
