import React, { useState } from 'react';
import axios from 'axios';
import '../css/delete.css'

export default function DeleteBook() {
    const [bookId, setBookId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/books/${bookId}`);
            setMessage('Book deleted successfully!');
            setBookId('');
        } catch (error) {
            setMessage('Error deleting book!');
            console.error('Error deleting book:', error);
        }
    };

    const confirmDelete = () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            handleDelete();
        }
    };

    return (
        <div className="container">
            <h2>Delete Book</h2>
            <div>
                <label>Book ID:</label>
                <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            </div>
            <button onClick={confirmDelete}>Delete Book</button>
            {message && <p>{message}</p>}
        </div>
    );
}
