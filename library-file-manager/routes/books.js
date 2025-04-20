const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');

// Create
router.post('/', auth, async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

// Read (list with pagination & filtering)
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, genre, author } = req.query;
  const filter = {};
  if (genre)  filter.genre  = genre;
  if (author) filter.author = author;
  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(books);
});

// Read single
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// Update
router.put('/:id', auth, async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Book deleted' });
});

module.exports = router;
