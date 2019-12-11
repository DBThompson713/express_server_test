const BookModel = require("../database/models/book_model");

async function create(req, res) {
  let { id } = req.params;
  let { body } = req.body;
  let book = await BookModel.findById(id);
  Book.comments.push({ body });
  await book.save();
  res.redirect(`/books/${book._id}`);
}

module.exports = {
  create
};
