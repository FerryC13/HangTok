const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 8080;

var database;
// settle connection
// mongoose.connect(
//   "mongodb+srv://FerryChandra:HangMant00k@word.x0n7q.mongodb.net/?retryWrites=true&w=majority",
//   { useNewUrlParser: true }
// );

// mongoose.connection.on("connected", () => {
//   console.log("Mongoose is connected!!!");
// });

//schema
const Schema = mongoose.Schema;
const WordSchema = new Schema({
  Words: String,
  Number: Number,
});

// Model
const Word = mongoose.model("Word", WordSchema);

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", async (req, res) => {
//   let result = await Word.find({
//     Words: { $ne: null },
//   })
//     .then((result) => {
//       console.log("Data :", result);
//       res.json(result);
//     })
//     .catch((e) => {
//       console.log("error: ", e);
//     });
// });
// module.exports = Word;

app.get("/api", (req, resp) => {
  database
    .collection("AoA_ratings_Kuperman")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      resp.json(res);
    });
});

app.listen(PORT, () => {
  MongoClient.connect(
    "mongodb+srv://FerryChandra:HangMant00k@word.x0n7q.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    (err, res) => {
      if (err) throw err;
      database = res.db("words");
      console.log("Can connect!");
    }
  );
});
