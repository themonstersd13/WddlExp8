require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth',  require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api',       require('./routes/files'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
