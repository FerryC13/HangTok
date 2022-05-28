const mongoose = require("mongoose");

//schema
const Schema = mongoose.Schema;
const WordSchema = new Schema({
  words: String,
  number: {
    type: Number,
  },
});

// Model
const Word = mongoose.model("Word", WordSchema);

module.exports = Word;
