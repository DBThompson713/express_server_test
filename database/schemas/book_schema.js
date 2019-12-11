const mongoose = require("mongoose"); // Require in mongoose
const Schema = mongoose.Schema; // Pull the Schema off of mongoose
const CommentSchema = require("./comment_schema");

// Creating the Book schema from Schema
// Notice the required
// NB the mongoose.Schema.Types.ObjectId is a special 'data type'
// It looks at the next ref key to know which collection to reference

const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author"
  },
  comments: [CommentSchema]
});

module.exports = BookSchema; // Dont forget to export the Book Schema
