const mongoose = require('mongoose') // Require in mongoose
const BookSchema = require('../schemas/book_schema') // Require in the Book Schema

const BookModel = mongoose.model('book', BookSchema) // Create a Book model out of the Book Schema

module.exports = BookModel // Export the Book model
