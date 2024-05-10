const jwt = require('jsonwebtoken');
const db = require('../connection/db.connection');
require('dotenv').config();


function validateBookData(req, res, next) {
    const { name, description } = req.body;

    
    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    
    if (name.length > 50) {
        return res.status(400).json({ message: "Name must be less than or equal to 50 characters" });
    }

    
    if (description.length > 200) {
        return res.status(400).json({ message: "Description must be less than or equal to 200 characters" });
    }

    
    next();
}

module.exports = validateBookData;


