// GET /books: To return the list of all the books.
// (In this endpoint the data should be paginated and there must be some sorting parameters to fetch the list in order of most likes or least likes.)
// PUT /books/like/:id: To like a book.
// PUT /books/unlike/:id: To, unlike a book.

const express = require("express"); 
const router = express();

const { isLoggedIn } = require("../middlewares/isLoggedIn");
const {} = require("../controllers/bookControllers")

// router.get("/books", books);
// router.put("/books/like/:id", likeBook);
// router.put("/books/unlike/:id", unlikeBook);

module.exports = router