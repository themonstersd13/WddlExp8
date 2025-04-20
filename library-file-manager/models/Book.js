const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  author: { type: String, required: true },
  genre:  { type: String },
  year:   { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
