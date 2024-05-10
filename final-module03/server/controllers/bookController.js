const db = require('../connection/db.connection');


async function getAllBooks(req, res) {
    try {
        const [books, fields] = await db.query('SELECT * FROM books');
        res.json(books);
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function searchBooksByName(req, res) {
    const { search } = req.query;
    try {
        const [books, fields] = await db.query('SELECT * FROM books WHERE name LIKE ?', [`%${search}%`]);
        res.json(books);
    } catch (error) {
        console.error("Error searching books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function getBookById(req, res) {
    const { id } = req.params;
    try {
        const [book, fields] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        if (book.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book[0]);
    } catch (error) {
        console.error("Error retrieving book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function addBook(req, res) {
    const { name, description } = req.body;
    const createdAt = new Date();
    try {
        const [result] = await db.query('INSERT INTO books (name, description, created_at) VALUES (?, ?, ?)', [name, description, createdAt]);
        const insertedBook = await db.query('SELECT * FROM books WHERE id = ?', [result.insertId]);
        res.status(201).json(insertedBook[0]);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function updateBookById(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedAt = new Date();
    try {
        const [result] = await db.query('UPDATE books SET name = ?, description = ?, updated_at = ? WHERE id = ?', [name, description, updatedAt, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        const updatedBook = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        res.json(updatedBook[0]);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function deleteBookById(req, res) {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllBooks,
    searchBooksByName,
    getBookById,
    addBook,
    updateBookById,
    deleteBookById
};
