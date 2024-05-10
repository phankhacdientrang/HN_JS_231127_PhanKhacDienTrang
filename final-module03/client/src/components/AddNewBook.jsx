import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addNewBook.css'

export default function AddBook() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/books', {
                name: name,
                description: description,
                price: price
            });
            setMessage('Book created successfully!');
            setName('');
            setDescription('');
            setPrice('');
        } catch (error) {
            setMessage('Error creating book!');
            console.error('Error creating book:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Add Book</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
