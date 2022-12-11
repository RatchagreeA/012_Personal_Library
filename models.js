const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, require: true },
  comments: [String],
});
const Books = mongoose.model("Books", BookSchema);

exports.Books = Books;
