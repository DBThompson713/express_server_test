const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating the Book schema from Schema
// Notice the required
// NB the mongoose.Schema.Types.ObjectId is a special 'data type'
// It looks at the next ref key to know which collection to reference

const CommentSchema = new Schema({
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  comment: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = CommentSchema;
