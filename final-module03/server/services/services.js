const db = require('../connection/db.connection.js');

async function getAll() {
    try {
        const allData = await db.query("SELECT * FROM books");
        return allData[0];
    } catch (error) {
        console.log("getAll error", error);
        throw error;
    }
}

async function search(name) {
    try {
        const nameBook = await db.query("SELECT * FROM books WHERE name = ?", [name]);
        return nameBook[0];
    } catch (error) {
        console.log("search error", error);
        throw error;
    }
}

async function getById(id) {
    try {
        const idBook = await db.query("SELECT * FROM books WHERE id =?", [id]);
        return idBook[0];
    } catch (error) {
        console.log("getById error", error);
        throw error;
    }
}

async function create(bookData) {
    try {
        const newBook = await db.query("INSERT INTO books (name, description, price) VALUES (?, ?, ?)", [bookData.name, bookData.description, bookData.price]);
        return newBook;
    } catch (error) {
        console.log("create error", error);
        throw error;
    }
}

async function update(bookId, bookData) {
    try {
        // Thực hiện truy vấn để cập nhật thông tin của cuốn sách với ID tương ứng
        const result = await db.query("UPDATE books SET name = ?, description = ?, price = ? WHERE id = ?", [bookData.name, bookData.description, bookData.price, bookId]);
        
        // Kiểm tra xem có cuốn sách nào được cập nhật không
        if (result.affectedRows === 0) {
            throw new Error(`Book with ID ${bookId} not found.`);
        }
        
        // Trả về kết quả
        return result;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

async function deleteBook(bookId) {
    try {
        // Thực hiện truy vấn để xóa cuốn sách với ID tương ứng
        const result = await db.query("DELETE FROM books WHERE id = ?", [bookId]);
        
        // Kiểm tra xem có cuốn sách nào bị xóa không
        if (result.affectedRows === 0) {
            throw new Error(`Book with ID ${bookId} not found.`);
        }
        
        // Trả về kết quả
        return result;
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
}

async function createAuthor(authorData) {
    try {
        // Thực hiện truy vấn để thêm tác giả mới vào cơ sở dữ liệu
        const result = await db.query("INSERT INTO authors (name, biography) VALUES (?, ?)", [authorData.name, authorData.biography]);
        
        // Lấy ID của tác giả mới được tạo
        const newAuthorId = result.insertId;
        
        // Truy vấn để lấy thông tin của tác giả với ID mới
        const newAuthor = await db.query("SELECT * FROM authors WHERE id = ?", [newAuthorId]);
        
        // Trả về thông tin của tác giả mới được tạo
        return newAuthor[0];
    } catch (error) {
        console.error("Error creating author:", error);
        throw error;
    }
}

async function getBooksByAuthor(authorId) {
    try {
        // Thực hiện truy vấn để lấy danh sách các sách của tác giả với ID tương ứng
        const books = await db.query("SELECT * FROM books WHERE author_id = ?", [authorId]);
        
        // Trả về danh sách các sách của tác giả
        return books;
    } catch (error) {
        console.error("Error fetching author's books:", error);
        throw error;
    }
}





module.exports = { 
    getAll,
    search,
    getById,
    create,
    update,
    deleteBook,
    createAuthor,
    getBooksByAuthor,
};
