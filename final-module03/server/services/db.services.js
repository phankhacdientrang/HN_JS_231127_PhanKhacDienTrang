const db = require('../connection/db.connection');

// Service để lấy tất cả các sách từ cơ sở dữ liệu
async function getAllBooks() {
    try {
        const [books, fields] = await db.query('SELECT * FROM books');
        return books;
    } catch (error) {
        console.error("Error retrieving books:", error);
        throw error;
    }
}

// Service để tìm sách theo tên
async function searchBooksByName(name) {
    try {
        const [books, fields] = await db.query('SELECT * FROM books WHERE name LIKE ?', [`%${name}%`]);
        return books;
    } catch (error) {
        console.error("Error searching books:", error);
        throw error;
    }
}

// Service để thêm một cuốn sách mới vào cơ sở dữ liệu
async function addBook(name, description) {
    const createdAt = new Date();
    try {
        const [result] = await db.query('INSERT INTO books (name, description, created_at) VALUES (?, ?, ?)', [name, description, createdAt]);
        return result.insertId;
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
}


async function updateBookById(id, name, description) {
    const updatedAt = new Date();
    try {
        const [result] = await db.query('UPDATE books SET name = ?, description = ?, updated_at = ? WHERE id = ?', [name, description, updatedAt, id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}


async function deleteBookById(id) {
    try {
        const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
}

module.exports = {
    getAllBooks,
    searchBooksByName,
    addBook,
    updateBookById,
    deleteBookById
};
