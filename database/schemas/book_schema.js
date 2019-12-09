const mongoose = require('mongoose') // Require in mongoose
const Schema = mongoose.Schema // Pull the Schema off of mongoose

// Creating the Book schema from Schema
// Notice the required
const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = BookSchema // Dont forget to export the Book Schema
