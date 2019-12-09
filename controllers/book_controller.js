const BookModel = require('../database/models/book_model')
const AuthorModel = require('../database/models/author_model')

// Logic for creating a resource
async function create (req, res) {
  let { name, author } = req.body // Destructuring off the name, author from the req.body
  let book = await BookModel.create({ name, author }) // Creating the book
    .catch(err => res.status(500).send(err))
  res.redirect('/books') // Redirect to /books
}

// Showed a list of all the resources
async function index (req, res) {
  let books = await BookModel.find() // Extracting all the books from the DB
  res.render('book/index', { books }) // Render the 'book/index view' pass it the books
}

// Shows the form to create the resource
async function make (req, res) {
  let authors = await AuthorModel.find().select('_id name')
  res.render('book/new', { authors })
}

// The logic for the Show controller
async function show (req, res) {
  //   console.log(req.params)
  let { id } = req.params // Destructure the id off the params.
  let book = await BookModel.findById(id).populate('author') // It knows that since there is an author id and its a ref. The program knows to populate the 'author'
  console.log(book)
  res.render('book/show', { book }) // render the 'book/show' and pass it the {book}
}

// Logic for deleting one single book
async function destroy (req, res) {
  let { id } = req.params // Destructure off the id off req.params
  await BookModel.findByIdAndRemove(id) // Delete the book by finding them by the id
  res.redirect('/books') // Redirect the user to the index page of all the books
}

// Logic for showing the form for editing an book
async function edit (req, res) {
  let { id } = req.params // Destructure off the id off req.params
  let book = await BookModel.findById(id) // query the DB for the book by ID
  res.render('book/edit', { book }) // Pass that book through to 'books/edit'
}

// The logic for updating by ID
async function update (req, res) {
  let { name } = req.body // Destructure name, bio and gender off req.body
  console.log(req.params)
  let { id } = req.params // Destructure off the id off req.params
  await BookModel.findByIdAndUpdate(id, { name }) // Update the book. Find by the id and then update with the new name, bio and gender
  res.redirect(`/books/${id}`) // Redirect to the show page for book we just updated
}

module.exports = {
  create,
  index,
  make,
  show,
  update,
  edit,
  destroy
}
