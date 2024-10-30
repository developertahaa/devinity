// Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5003;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Use the URI from the .env file
const uri = process.env.MONGODB_URI;

// Define the contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
});

// Create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// POST endpoint to save contact information
app.post('/contact', async (req, res) => {
  const { name, email, subject } = req.body;

  try {
    const newContact = new Contact({ name, email, subject });
    await newContact.save();
    res.status(201).json({ message: 'Contact information saved!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact information.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
