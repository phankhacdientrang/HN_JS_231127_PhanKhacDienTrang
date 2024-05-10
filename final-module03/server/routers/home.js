const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const validateBookData = require('../middlewares/validateBookData');


router.get('/api/v1/books', bookController.getAllBooks);
router.get('/api/v1/books/search', bookController.searchBooksByName);
router.get('/api/v1/books/:id', bookController.getBookById);
router.post('/api/v1/books', validateBookData, bookController.addBook);
router.put('/api/v1/books/:id', validateBookData, bookController.updateBookById);
router.delete('/api/v1/books/:id', bookController.deleteBookById);


router.post('/api/v1/authors', authorController.addAuthor);
router.get('/api/v1/authors/:id/books', authorController.getBooksByAuthor);

module.exports = router;
