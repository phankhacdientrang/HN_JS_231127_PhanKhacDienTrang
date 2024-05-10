import React, { useState } from 'react';
import axios from 'axios';
import './UpdateBook.css'; 

export default function UpdateBook() {
    const [bookId, setBookId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/books/${bookId}`, {
                name: name,
                description: description,
                price: price
            });
            setMessage('Book updated successfully!');
            setBookId('');
            setName('');
            setDescription('');
            setPrice('');
        } catch (error) {
            setMessage('Error updating book!');
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className="container"> {/* Thêm className để áp dụng CSS */}
            <h2>Update Book</h2>
            <div>
                <label>Book ID:</label>
                <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Price:</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <button onClick={handleUpdate}>Update Book</button>
            {message && <p>{message}</p>}
        </div>
    );
}
