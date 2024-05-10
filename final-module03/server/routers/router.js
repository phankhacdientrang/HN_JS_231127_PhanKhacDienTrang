const express = require('express');
const router = express.Router()
const service = require('../services/services.js')

router.get('/api/v1/books',async (req,res)=>{
    const data =await service.getAll()
    res.send(data)
})

router.post('/api/v1/book',async (req,res)=>{
    const {name} = req.body
    const book = await service.search(name)
    res.send(book)
})

router.get('/api/v1/books/:id',async (req,res)=>{
    const {id} = req.params
    const book = await service.getById(id)
    res.send(book)
})

router.post('/api/v1/books', async (req, res) => {

    const { name, description, price } = req.body;
    console.log(name, description, price);
    const book = await service.create({ name, description, price });
    res.send(book);
});

router.put('/api/v1/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { name, description, price } = req.body;
    try {
        await service.update(bookId, { name, description, price });
        res.status(200).json({ message: `Book with ID ${bookId} has been updated successfully.` });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "An error occurred while updating the book." });
    }
});

router.delete('/api/v1/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        
        await service.deleteBook(bookId);
        res.status(200).json({ message: `Book with ID ${bookId} has been deleted successfully.` });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "An error occurred while deleting the book." });
    }
});

router.post('/api/v1/authors', async (req, res) => {
    const { name, biography } = req.body;

    try {
        const newAuthor = await service.createAuthor({ name, biography });
        
        res.status(201).json({ message: "Author created successfully", author: newAuthor });
    } catch (error) {
        console.error("Error creating author:", error);
        res.status(500).json({ error: "An error occurred while creating the author." });
    }
});

router.get('/api/v1/authors/:id/books', async (req, res) => {
    const authorId = req.params.id;

    try {
        const books = await service.getBooksByAuthor(authorId);
        res.status(200).json({ books });
    } catch (error) {
        console.error("Error fetching author's books:", error);
        res.status(500).json({ error: "An error occurred while fetching author's books." });
    }
});

module.exports = router