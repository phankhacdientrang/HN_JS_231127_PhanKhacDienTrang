import React, { useState } from 'react';
import axios from 'axios';
import '../css/add.css'

export default function AddBook() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            if (!name || !description || !price) {
                setMessage('Please fill in all fields.');
                return;
            }

            
            setLoading(true);

            
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
        } finally {
            
            setLoading(false);
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
                <button type="submit" disabled={loading}>Add Book</button>
            </form>
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
        </div>
    );
}
