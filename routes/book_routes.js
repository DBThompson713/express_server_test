const express = require('express') // Requires in express
const router = express.Router() // Use the express router
const BookController = require('../controllers/book_controller') // Bring in the BookController

// Remember the pattern
// router.<verb>('url', <controller>.<function>)

router.get('/', BookController.index)

router.post('/', BookController.create)

router.get('/new', BookController.make)

// Show is the name chosen because of rails naming convention. We could choose anything
// The ":" indicates there is a variable or wild card coming into the route
// What we put after the ":" will be made avalible under params in the controller
router.get('/:id', BookController.show)

router.get('/:id/edit', BookController.edit)

router.patch('/:id', BookController.update)

router.put('/:id', BookController.update)

router.delete('/:id', BookController.destroy)

module.exports = router
