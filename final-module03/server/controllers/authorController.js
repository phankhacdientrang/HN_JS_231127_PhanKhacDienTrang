const db = require('../connection/db.connection');


async function addAuthor(req, res) {
    const { name } = req.body;
    const createdAt = new Date();
    try {
        const [result] = await db.query('INSERT INTO authors (name, created_at) VALUES (?, ?)', [name, createdAt]);
        const insertedAuthor = await db.query('SELECT * FROM authors WHERE id = ?', [result.insertId]);
        res.status(201).json(insertedAuthor[0]);
    } catch (error) {
        console.error("Error adding author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function getBooksByAuthor(req, res) {
    const { id } = req.params;
    try {
        const [books, fields] = await db.query('SELECT * FROM books WHERE author_id = ?', [id]);
        res.json(books);
    } catch (error) {
        console.error("Error retrieving books by author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    addAuthor,
    getBooksByAuthor
};
