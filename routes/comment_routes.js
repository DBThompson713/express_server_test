const express = require("express"); // Requires in express
const router = express.Router(); // Use the express router
const CommentController = require("../controllers/comment_controller"); // Bring in the BookController

// Remember the pattern
// router.<verb>('url', <controller>.<function>)

router.post("/", CommentController.create);

module.exports = router;
