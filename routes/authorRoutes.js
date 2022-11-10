// GET /authors: To return the response of all the authors in the database with number of books published by that author
// GET /authors/:id: To return the details of the author with the given author id with list of books.
// GET /authors/me: To return the details of the logged-in author.

const express = require("express"); 
const router = express();

const { getAuthors, getAuthorbyID, getCurrentAuthor } = require("../controllers/authorControllers")
const { checkLoggedIn } = require('../middlewares/isLoggedIn');

router.get("/authors", checkLoggedIn, getAuthors);
router.get("/authors/me/", checkLoggedIn, getCurrentAuthor);
router.get("/authors/:id", checkLoggedIn, getAuthorbyID);


module.exports = router